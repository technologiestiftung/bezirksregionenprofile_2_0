<template>
  <div>
    <page-header></page-header>

    <v-row>
      <v-col cols="12">
        <intro-bz :data="bzrOverview" type="Bezirksregion"></intro-bz>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="5" lg="4">
        <div>
          <bzr-map></bzr-map>
        </div>
        <nav class="list-container">
          <v-list dense>
            <v-subheader>Themen</v-subheader>
            <v-list-item-group v-model="listId" color="primary">
              <v-list-item v-for="(item, i) in themen" :key="i" @click="$vuetify.goTo('#thema-id-' + item.id, scrollOptions)">
                <v-list-item-icon>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    ><span class="pr-3">{{ item.id }}.</span>{{ item.name }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <div class=" d-none d-md-flex justify-center mt-10">
            <v-btn depressed class="mx-2" x-large fab color="primary" @click="$vuetify.goTo(0)">
              <v-icon size="26">mdi-arrow-up</v-icon>
            </v-btn>
          </div>
        </nav>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="8">
        <ul class="bzr-content mx-n3 mx-sm-n5 mx-md-0 grey lighten-4">
          <li v-for="thema in themen" :key="thema.name" v-intersect="onIntersect" class="px-5 py-1 pa-lg-10" :data-id="thema.id">
            <!-- Title Thema -->
            <h3 :id="'thema-id-' + thema.id">{{ thema.id }}. {{ thema.name }}</h3>

            <div v-for="(blattEl, index) in datenByTheme[thema.id]" :key="index" class="datenblatt-element">
              <content-setup :data-el="blattEl" :content-id="index"></content-setup>
            </div>
          </li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Papa from 'papaparse'
import introBz from '~/components/introBzBzr.vue'
import pageHeader from '~/components/pageHeader.vue'
import contentSetup from '~/components/bzr/contentSetup.vue'
import bzrMap from '~/components/maps/bzrMap.vue'

export default {
  components: {
    pageHeader,
    introBz,
    contentSetup,
    bzrMap
  },
  data() {
    return {
      bzrOverview: null,
      listId: 0,
      datenblatt: null,
      scrollOptions: {
        duration: 600,
        easing: 'easeInOutCubic',
        offset: 20
      }
    }
  },
  head() {
    return {
      title: this.currentBz.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Datenprofil zu ' + this.currentBz.name
        }
      ]
    }
  },
  computed: {
    ...mapState(['bzBzrPrData', 'themen', 'currentBrz']),
    // return data sorted by thema
    datenByTheme() {
      const r = []
      this.themen.forEach((thema) => {
        r[thema.id] = []
        this.datenblatt.forEach((d) => {
          if (parseInt(d.ref) === thema.id) {
            r[thema.id].push(d)
          }
        })
      })
      return r
    }
  },
  async asyncData({ params, $axios, error }) {
    // load bzr-overview
    const bzrOverviewUrl = process.env.apiUrl + `/bz-data/${params.bz}/bzr-data/${params.bzr}/bzr-overview.json`
    let bzrOverview = await $axios.get(bzrOverviewUrl).catch((e) => {
      error({
        statusCode: 404,
        message: `The API source file: ${bzrOverviewUrl} coluld not be loaded`
      })
    })
    if (bzrOverview) {
      bzrOverview = bzrOverview.data
    }

    // load datenblatt
    const datenblattUrl = process.env.apiUrl + `/bz-data/${params.bz}/bzr-data/${params.bzr}/datenblatt.csv`
    let datenblatt = await $axios.get(datenblattUrl).catch((e) => {
      error({
        statusCode: 404,
        message: `The API source file: ${datenblattUrl} could not be loaded`
      })
    })

    if (datenblatt) {
      datenblatt = Papa.parse(datenblatt.data, { header: true, skipEmptyLines: true }).data

      // loop through all content elements and load additional data if needed
      for (let i = 0; i < datenblatt.length; i++) {
        // fix path for images - all data is on the api
        if (datenblatt[i].type !== undefined && datenblatt[i].type === 'image') {
          datenblatt[i].datasource = process.env.apiUrl + '/images/optimized/' + datenblatt[i].datasource
        } else if (datenblatt[i].content !== undefined) {
          datenblatt[i].content = datenblatt[i].content.replace('data/images', process.env.apiUrl + '/images/optimized')
        }
        // load additional data
        if (datenblatt[i].datasource !== undefined && datenblatt[i].datasource !== '' && datenblatt[i].type !== 'image') {
          datenblatt[i].data = null
          const sourceData = await $axios
            .get(process.env.apiUrl + `/bz-data/${params.bz}/bzr-data/${params.bzr}/data/${datenblatt[i].datasource}.csv`)
            .catch((e) => {})
          if (sourceData) {
            datenblatt[i].data = Papa.parse(sourceData.data, {
              header: true,
              skipEmptyLines: true
            }).data
          }
        }
      }
    }
    return {
      bzrOverview,
      datenblatt
    }
  },
  async fetch({ store, params, error }) {
    await store.dispatch('loadBaseData')
    if (!store.state.bzBzrPrData[params.bz]) {
      error({ statusCode: 404 })
    } else if (!store.state.bzBzrPrData[params.bz].bzr[params.bzr]) {
      error({ statusCode: 401 })
    } else {
      store.commit('setCurrentBz', params.bz)
      store.commit('setCurrentBzr', store.state.bzBzrPrData[params.bz].bzr[params.bzr])
    }
  },
  mounted() {},
  methods: {
    onIntersect(entries, observer, isIntersecting) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      if (isIntersecting) {
        this.prevIntersection = this.listId
        this.listId = parseInt(entries[0].target.dataset.id) - 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul.bzr-content {
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
}

.v-list--dense .v-subheader {
  font-size: 22px;
  height: 60px;
}

.list-container {
  position: sticky;
  top: 0;
}
</style>

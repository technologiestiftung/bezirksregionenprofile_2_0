<template>
  <div>
    <page-header></page-header>

    <v-row>
      <v-col cols="12">
        <intro-bz :data="bzOverview" type="Bezirk"></intro-bz>
      </v-col>
    </v-row>

    <v-row class="grey lighten-4" no-gutters>
      <v-col cols="12" sm="12" md="5">
        <div class="map-dropdown-wrapper">
          <div class="map-dropdown">
            <v-menu v-model="menuOpen" offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">
                  <v-icon class="mr-3">mdi-menu-down</v-icon>{{ selectedName }}
                </v-btn>
              </template>
              <v-list :nav="true" dense min-width="300">
                <v-list-item @click="$store.commit('setCurrentBzr', null)">
                  <v-list-item-title>{{ currentBz.name }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-for="(item, index) in bzrSorted"
                  :key="index"
                  @mouseover="hoverItem = item.name"
                  @click="$store.commit('setCurrentBzr', currentBz.bzr[index])"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <index-map :hover-item="hoverItem" map-type="bezirk"></index-map>
      </v-col>
      <v-col cols="12" sm="12" md="7">
        <info-bz></info-bz>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import introBz from '~/components/introBzBzr.vue'
import pageHeader from '~/components/pageHeader.vue'
import indexMap from '~/components/maps/indexMap.vue'
import infoBz from '~/components/bz/infoBz.vue'

export default {
  components: {
    pageHeader,
    introBz,
    indexMap,
    infoBz
  },
  data() {
    return {
      breadcrumb: [{ text: 'home', href: '/' }],
      bzOverview: null,
      hoverItem: null,
      menuOpen: false
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
          content: 'Datenprofil zu: ' + this.currentBz.name
        }
      ]
    }
  },
  computed: {
    ...mapState(['bzBzrPrData', 'currentBz', 'currentBzr']),
    bzrSorted() {
      if (this.currentBz.bzr) {
        const ordered = {}
        Object.keys(this.currentBz.bzr)
          .sort()
          .forEach((key) => {
            ordered[key] = this.currentBz.bzr[key]
          })
        return ordered
      } else {
        return null
      }
    },
    selectedName() {
      return this.currentBzr !== null ? this.currentBzr.name : this.currentBz.name
    },
    selectedUrl() {
      return this.currentBz.url + '/' + this.currentBzr
    }
  },
  async asyncData({ params }) {
    const { data } = await axios.get(process.env.apiUrl + `/bz-data/${params.bz}/bz-overview.json`)
    return { bzOverview: data }
  },
  async fetch({ store, params, error }) {
    await store.dispatch('loadBaseData')
    if (!store.state.bzBzrPrData[params.bz]) {
      error({ statusCode: 404 })
    } else {
      store.commit('setCurrentBz', params.bz)

      await store.dispatch('loadCurrentBzIndikatorenData')
      await store.dispatch('loadCurrentBzIndikatorenBzrData')
    }
  },
  mounted() {
    this.$store.commit('setCurrentBzr', null) // reset bzr to null
  },
  methods: {
    setBzr(e) {
      this.selected = this.currentBz.bzr[e]
    }
  }
}
</script>

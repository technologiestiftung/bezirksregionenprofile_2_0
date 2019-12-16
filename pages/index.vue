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
            <select @change="onChange($event)">
              <option value="" :selected="isSelected(0)">Bezirk {{ currentBz.name }}</option>
              <option v-for="(item, index) in bzrSorted" :key="index" :value="index" :selected="isSelected(index)">
                {{ item.name }}
              </option>
            </select>
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
    const { data } = await axios.get(process.env.apiUrl + `/bz-data/tempelhofschoeneberg/bz-overview.json`)
    return { bzOverview: data }
  },
  async fetch({ store, params, error }) {
    await store.dispatch('loadBaseData')
    store.commit('setCurrentBz', 'tempelhofschoeneberg')
    await store.dispatch('loadCurrentBzIndikatorenData')
    await store.dispatch('loadCurrentBzIndikatorenBzrData')
  },
  mounted() {
    this.$store.commit('setCurrentBzr', null) // reset bzr to null
  },
  methods: {
    onChange(event) {
      this.$store.commit('setCurrentBzr', this.currentBz.bzr[event.target.value])
    },
    isSelected(item) {
      if (!this.currentBzr) {
        if (item === 0) {
          return true
        } else {
          return false
        }
      } else if (this.currentBzr.url === item) {
        return true
      } else {
        return false
      }
    },
    setBzr(e) {
      this.selected = this.currentBz.bzr[e]
    }
  }
}
</script>

<style lang="scss" scoped>
select {
  padding: 10px;
  background-color: #253276;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  -webkit-appearance: menulist;
}
</style>

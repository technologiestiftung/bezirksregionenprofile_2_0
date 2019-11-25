import Papa from 'papaparse'
import mapStyle from '~/static/map/bright-v9.json'
import toIndikatorenJSON from '~/assets/js/toIndikatorenJSON.js'

// define the source of the tiles etc
mapStyle.sources = {
  openmaptiles: {
    attribution:
      "<a href='http://openmaptiles.org'>© OpenMapTiles</a> <a href='http://www.openstreetmap.org/copyright'>© OpenStreetMap</a>",
    type: 'vector',
    tiles: [
      // 'https://tsb.ara.uberspace.de/tsb-tiles/tiles/berlin/{z}/{x}/{y}.pbf'
      process.env.baseUrl + '/map/tiles/{z}/{x}/{y}.pbf'
    ]
  }
}
mapStyle.sprite = process.env.baseUrl + '/map/sprites/positron'
mapStyle.glyphs = process.env.baseUrl + '/map/glyphs/{fontstack}/{range}.pbf'

// state
export const state = () => ({
  mapData: null,
  themen: null,
  indikatorenOverview: null,
  bzBzrPrData: null,
  mapStyle,
  mapColors: ['#253276', '#e10611'],
  bezirkeGeojson: null,
  currentBz: null,
  currentBzr: null,
  currentBzIndikatorenData: null,
  currentBzIndikatorenBzrData: {}
})

// getters
export const getters = {}

// mutations
export const mutations = {
  setThemen(state, data) {
    state.themen = data
  },
  setBezirkeGeojson(state, data) {
    state.bezirkeGeojson = data
  },
  setBzBzrPrData(state, data) {
    state.bzBzrPrData = data
  },
  setCurrentBz(state, data) {
    state.currentBz = state.bzBzrPrData[data]
  },
  setCurrentBzr(state, data) {
    state.currentBzr = data
  },
  setCurrentBzIndikatorenData(state, data) {
    state.currentBzIndikatorenData = data
  },
  setCurrentBzIndikatorenBzrData(state, data) {
    state.currentBzIndikatorenBzrData = data
  },
  setIndikatorenOverview(state, data) {
    state.indikatorenOverview = data
  }
}

// actions
export const actions = {
  async loadBaseData() {
    await this.dispatch('loadBezirkeGeojson')
    await this.dispatch('loadBzBzrPrData')
    await this.dispatch('loadThemen')
    await this.dispatch('loadIndikatorenOverview')
  },
  async loadIndikatorenOverview({ commit, state }) {
    if (!state.indikatorenOverview) {
      const data = await this.$axios.$get(process.env.apiUrl + '/indikatoren/indikatorenOverview.json')
      commit('setIndikatorenOverview', data)
    }
  },
  async loadThemen({ commit, state }) {
    if (!state.themen) {
      const data = await this.$axios.$get(process.env.apiUrl + '/themen.json')
      commit('setThemen', data)
    }
  },
  async loadBezirkeGeojson({ commit, state }) {
    if (!state.bezirkeGeojson) {
      const data = await this.$axios.$get(process.env.apiUrl + '/generated/geojson/geojson_bezirke.json').catch((e) => {})
      commit('setBezirkeGeojson', data)
    }
  },
  async loadBzBzrPrData({ commit, state }) {
    if (!state.bzBzrPrData) {
      const data = await this.$axios.$get(process.env.apiUrl + '/generated/bz-bzr-pr.json').catch((e) => {})
      commit('setBzBzrPrData', data)
    }
  },
  async loadCurrentBzIndikatorenData({ commit, state }) {
    const data = await this.$axios.$get(process.env.apiUrl + '/bz-data/' + state.currentBz.url + '/indikatoren.csv')
    const d = toIndikatorenJSON(Papa, data)
    commit('setCurrentBzIndikatorenData', d)
  },
  async loadCurrentBzIndikatorenBzrData({ commit, state }) {
    const r = {}
    for (const [key] of Object.entries(state.currentBz.bzr)) {
      const url = process.env.apiUrl + '/bz-data/' + state.currentBz.url + '/bzr-data/' + key + '/indikatoren.csv'
      const data = await this.$axios.$get(url).catch((e) => {})
      if (data) {
        const d = toIndikatorenJSON(Papa, data)
        r[key] = d
      } else {
        r[key] = false
      }
    }

    commit('setCurrentBzIndikatorenBzrData', r)
  }
}

<template>
  <div>
    <page-header></page-header>

    <v-row>
      <v-col cols="12" sm="12" md="7" lg="7" xl="8" order="2" order-md="1">
        <div class="map-dropdown-wrapper">
          <div class="map-dropdown">
            <v-menu v-model="menuOpen" offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="primary" dark>
                  Bezirk auswählen
                  <div class="arrow"></div>
                </v-btn>
              </template>
              <v-list :nav="true" dense min-width="300">
                <v-list-item
                  v-for="(item, index) in bzBzrPrDataSorted"
                  :key="index"
                  @mouseover="hoverItem = item.name"
                  @click="$router.push({ path: index })"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <index-map :hover-item="hoverItem" map-type="bezirke"></index-map>
        </div>
      </v-col>
      <v-col order="1" order-md="2" cols="12" sm="12" md="5" lg="5" xl="4">
        <div class="primary d-flex flex-column justify-center px-6 py-6 pa-md-12 white--text h-100">
          <div class="intro-text">
            <h2>Wie geht es den Berliner Bezirken?</h2>
            <p>
              In welchem Kiez gibt es viele Spielplätze? Wo ziehen überdurchschnittlich viele Berliner:innen hin? Der Ist-Zustand
              der Berliner Bezirke und der kleineren Bezirksregionen wird in sogenannten Bezirksregionenprofilen (kurz: BZRP)
              festegehalten. Anhand von Kernindikatoren zu den Themen "Wohnen", "Demographie", "Dynamik", "Arbeitsmarkt" und
              "Kinder und Jungend" wird eine vergleichbare Datengrundlage zu sozialraumorientierten Themen geschaffen. In dieser
              Anwendung werden diese Kernindikatoren interaktiv aufbereitet und - soweit vorliegend - die ausführlichen Berichte
              der Bezirke bereitgestellt. <br /><br />
              &#9432; <i>Klicke auf den Bezirk, über den Du mehr erfahren möchtest.</i>
            </p>
            <v-btn depressed large href="/about" small>Über das Projekt</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import indexMap from '~/components/maps/indexMap.vue'
import pageHeader from '~/components/pageHeader.vue'

export default {
  components: {
    pageHeader,
    indexMap
  },
  data() {
    return {
      hoverItem: null, // url of selected bezirk
      menuOpen: false
    }
  },
  head() {
    return {
      title: 'Home',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Profile zu Berliner Beziken'
        }
      ]
    }
  },
  computed: {
    ...mapState(['bzBzrPrData']),
    bzBzrPrDataSorted() {
      if (this.bzBzrPrData) {
        const ordered = {}
        Object.keys(this.bzBzrPrData)
          .sort()
          .forEach((key) => {
            if (['tempelhofschoeneberg', 'marzahnhellersdorf', 'lichtenberg', 'steglitzzehlendorf'].includes(key)) {
              ordered[key] = this.bzBzrPrData[key]
            }
          })
        return ordered
      } else {
        return null
      }
    }
  },
  watch: {
    menuOpen() {
      // reset selected when menu closes
      if (!this.menuOpen) {
        this.selected = ''
      }
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('loadBaseData')
  },
  methods: {
    setSelected(e) {
      this.selected = e
    }
  }
}
</script>

<style lang="scss" scoped>
.intro-text {
  @media screen and (min-width: 1264px) {
    h2 {
      font-size: 26px;
    }
    p {
      font-size: 18px;
    }
  }
  @media screen and (min-width: 1400px) {
    h2 {
      font-size: 32px;
    }
    p {
      font-size: 22px;
    }
  }
}
</style>

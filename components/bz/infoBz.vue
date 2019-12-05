<template>
  <div class="pa-3 pa-sm-6 pa-md-8 pa-lg-12 h-100">
    <v-row class="align-center">
      <v-col cols="12" lg="5">
        <h3>Themen & Daten</h3>
      </v-col>
      <v-col cols="12" lg="7" class="d-flex justify-lg-end align-center bz-bzr-toggle">
        <div v-if="currentBzr">
          <b class="pr-3">Vergleichen mit: </b>
          <v-btn-toggle v-model="compareSelected" color="primary">
            <v-btn value="bezirk">
              Bezirk
            </v-btn>
            <v-btn value="berlin">
              Berlin
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
    </v-row>
    <div class="datenprofile-container">
      <v-btn v-if="currentBzr && currentBzIndikatorenBzrData[currentBzr.url]" :to="bzrUrl" color="primary" nuxt>
        <v-icon class="mr-3">mdi-arrow-right</v-icon>zum Datenprofil
        {{ currentBzr.name }}
      </v-btn>
    </div>
    <div class="indikatoren-menu pt-6">
      <v-row v-if="indDataParsed">
        <v-col
          v-for="indikator in indikatorenOverview"
          :key="indikator.name"
          :class="activeInd == indikator.id ? 'active' : ''"
          cols="12"
          sm="6"
          md="4"
          xl=""
        >
          <v-btn :class="indikator.class" @click="activeInd = parseInt(indikator.id)" text class="w-100">{{
            indikator.name
          }}</v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-alert type="error">
            Daten für diese Bezirksregion konnten nicht geladen werden.
          </v-alert>
        </v-col>
      </v-row>
    </div>
    <v-row v-if="indDataParsed">
      <v-col v-for="(indikator, index) in indikatorenOverview[activeInd].indikatoren" :key="index" cols="12" class="viz pb-5">
        <div class="d-flex justify-space-between align-end pb-2">
          <div>
            <h3 class="mb-0 pr-5">{{ indikator['text-sm'] }} (KID: {{ indikator['name'] }})</h3>
            <div class="info-text">
              <b>{{ indDataParsed[indikator.name].val }} {{ indikator['unit'] }}</b>
            </div>
          </div>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" aria-label="Weitere Informationen zu Diagramm" color="primary" text icon
                ><v-icon>mdi-information</v-icon></v-btn
              >
            </template>
            <span class="tooltip-text"
              >{{ indikator['text-lg'] + ': ' }}
              <b>{{ indDataParsed[indikator.name].val }}</b>
              {{ indikator['unit'] }}
            </span>
          </v-tooltip>
        </div>
        <transition name="fade">
          <viz-bz
            :id="'vizbiz-' + index"
            :active-ind-class="activeIndClass"
            :indikator-value="indDataParsed[indikator.name].val"
            :indikator-value-percent="indDataParsed[indikator.name].valPercent"
            :average-value="indDataParsed[indikator.name].average"
            :active-ind="activeInd"
            :compare-selected-name="compareSelectedName"
            :current-bzr="currentBzr"
          >
          </viz-bz>
        </transition>
      </v-col>
    </v-row>
    <v-row class="justify-end pt-5">
      <v-btn @click="overlay = true" class="mx-2" tile large color="primary"> <v-icon left light>mdi-help</v-icon> Hilfe </v-btn>
    </v-row>

    <div class="my-modal">
      <v-overlay :value="overlay" @click="overlay = false">
        <v-card light class="mx-auto pa-3 pa-md-4">
          <v-card-title>
            <div class="d-flex justify-end w-100 align-center">
              <v-btn @click="overlay = false" icon>
                <v-icon size="40">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <h3>Wie die Grafiken zu lesen sind</h3>
            <p>
              Für jeden Kernindikator wird der Wert des Bezirks (der Bezirksregion) mit Berlin (bzw. für Bezirksregionen wahlweise
              mit Berlin oder dem Bezirk) verglichen. Die Abweichung vom Vergleichswert wird in Prozent angezeigt.
            </p>
            <h3>Kurzinfo zu den Kernindikatoren</h3>
            <p>
              Ein Hover über das <v-icon size="20">mdi-information</v-icon> bei jedem Kernindikator zeigt eine ausführlichere
              Erklärung des Indikators sowie den genauen Wert an. Ausfürliche Info zu den Kernindikatoren Hier klicken
            </p>
            <h3>Ausfürliche Informationen</h3>
            <p>
              <v-btn class="mt-1" tile color="primary" small to="/about#indikators">
                <v-icon left>mdi-arrow-right</v-icon>
                Beschreibung der einzelnen Kernindikatoren
              </v-btn>
            </p>
          </v-card-text>
        </v-card>
      </v-overlay>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vizBz from '~/components/bz/vizBz.vue'
export default {
  components: { vizBz },
  props: {},
  data() {
    return {
      activeInd: 1,
      compareSelected: 'berlin',
      overlay: false
    }
  },
  computed: {
    ...mapState(['indikatorenOverview', 'currentBzIndikatorenData', 'currentBzIndikatorenBzrData', 'currentBzr', 'currentBz']),
    bzrUrl() {
      let u = ''
      if (this.currentBz && this.currentBzr) {
        u = '/' + this.currentBz.url + '/' + this.currentBzr.url
      }
      return u
    },
    compareSelectedName() {
      return this.compareSelected === 'bezirk' && this.currentBzr ? 'Bezirk' : 'Berlin'
    },
    indData() {
      return this.currentBzr ? this.currentBzIndikatorenBzrData[this.currentBzr.url] : this.currentBzIndikatorenData
    },
    activeIndClass() {
      return `indGr${this.activeInd}`
    },
    indDataParsed() {
      if (this.indData) {
        const newIndData = {}
        const indCopy = JSON.parse(JSON.stringify(this.indData))

        for (const x in indCopy) {
          newIndData[x] = indCopy[x]
          // compare with bz
          if (this.compareSelected === 'bezirk' && this.currentBzr) {
            const currentVal = parseFloat(this.indData[x].val)
            const averageVal = parseFloat(this.currentBzIndikatorenData[x].val)
            const deviationVal = ((currentVal - averageVal) / averageVal) * 100 // Abweichung vom Durchschnittswert
            newIndData[x].val = currentVal
            newIndData[x].valPercent = deviationVal
            newIndData[x].average = averageVal
            newIndData[x].phase = newIndData[x].phaseBz
          }
          // compare with berlin
          else {
            let average
            for (const indClass in this.indikatorenOverview) {
              if (this.indikatorenOverview[indClass].indikatoren[x]) {
                average = this.indikatorenOverview[indClass].indikatoren[x].average
              }
            }
            const averageVal = parseFloat(average)
            const currentVal = parseFloat(newIndData[x].val)
            const deviationVal = ((currentVal - averageVal) / averageVal) * 100 // Abweichung vom Durchschnittswert

            newIndData[x].val = currentVal
            newIndData[x].valPercent = deviationVal
            newIndData[x].average = averageVal
            newIndData[x].phase = newIndData[x].phaseB
          }
        }
        return newIndData
      } else {
        return null
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.indikatoren-menu {
  button {
    border-bottom: 2px solid #000;
    border-radius: 0px;
  }
}

.datenprofile-container {
  height: 36px;
}

.bz-bzr-toggle {
  min-height: 80px;
}

.tooltip-text {
  max-width: 300px;
  display: block;
}

.active {
  .indGr1 {
    color: $color-indGr1;
    border-bottom: 3px solid $color-indGr1;
  }
  .indGr2 {
    color: $color-indGr2;
    border-bottom: 3px solid $color-indGr2;
  }
  .indGr3 {
    color: $color-indGr3;
    border-bottom: 3px solid $color-indGr3;
  }
  .indGr4 {
    color: $color-indGr4;
    border-bottom: 3px solid $color-indGr4;
  }
  .indGr5 {
    color: $color-indGr5;
    border-bottom: 3px solid $color-indGr5;
  }
  .indGr6 {
    color: $color-indGr6;
    border-bottom: 3px solid $color-indGr6;
  }
}
</style>

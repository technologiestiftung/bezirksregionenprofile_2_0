<template>
  <div>
    <v-row>
      <v-col cols="12" lg="9">
        <h5>{{ type }}</h5>
        <h2>{{ data.name }}</h2>
        <p>
          {{ data.introText }}
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-5 align-center">
      <v-col cols="12" md="12" lg="">
        <div class="d-flex">
          <div class="intro-item pr-4 pr-md-5 pr-xl-12">
            <v-icon class="pr-2 black--text">mdi-map</v-icon>Fläche:
            <b class="pt-1">{{ data.facts.flaeche }} km²</b>
          </div>

          <div class="intro-item pr-4 pr-md-5 pr-xl-12">
            <v-icon class="pr-2 black--text">mdi-account-group</v-icon>Einwohner:
            <b class="pt-1">{{ data.facts.einw }}</b>
          </div>
          <div class="intro-item pr-4 pr-md-5 pr-xl-12">
            <v-icon class="pr-2 black--text">mdi-grid</v-icon>Bevölkerungsdichte:
            <b class="pt-1">{{ data.facts.dichte }} EW/km²</b>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="12" lg="">
        <div v-if="type === 'Bezirksregion'" class="d-flex justify-lg-end">
          <div class="intro-item pr-4 pr-md-5 pr-xl-12">
            <v-btn outlined color="primary" class="ma-2" @click="openImprintModal">Impressum</v-btn>
          </div>
          <div class="intro-item">
            <v-btn :disabled="!datatUrl" :href="datatUrl" outlined color="primary" class="ma-2">
              <v-icon class="mr-3">mdi-download</v-icon>Daten download</v-btn
            >
          </div>
        </div>
        <div v-else class="d-flex justify-lg-end">
          <div class="intro-item pr-4 pr-md-5 pr-xl-12">
            <v-icon class="pr-2 black--text">mdi-file-table-outline</v-icon>Datenquelle:
            <b>Amt für Statistik</b>
          </div>
          <div class="intro-item">
            <v-icon class="pr-2 black--text">mdi-calendar-month-outline</v-icon>Datenstand:
            <b>{{ releaseDate }}</b>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialog: true
    }
  },
  computed: {
    imprintTxt() {
      return this.data.imprintTxt ? this.data.imprintTxt : null
    },
    datatUrl() {
      return this.data.datatUrl ? this.data.datatUrl : null
    },
    releaseDate() {
      return this.data.datenstand ? this.data.datenstand : ' --- '
    }
  },
  methods: {
    openImprintModal() {}
  }
}
</script>

<style lang="scss" scoped>
.d-flex {
  @media screen and (max-width: 959px) {
    flex-wrap: wrap;
  }
}

.intro-item {
  @media screen and (max-width: 959px) {
    flex: 0 0 100%;
  }
}
</style>

<template>
  <div v-if="dataEl">
    <!-- Title -->
    <h4 v-if="dataEl.type === 'titel'" class="blatt-el-titel">
      {{ dataEl.content }}
    </h4>
    <!-- Title -->
    <h5 v-if="dataEl.type === 'titel-sm'" class="blatt-el-titel-sm">
      {{ dataEl.content }}
    </h5>
    <!-- Text -->
    <client-only>
      <div v-if="dataEl.type === 'text'" class="blatt-el-text" v-html="txt">{{ txt }}</div>
    </client-only>
    <!-- Image -->
    <v-row align="center" justify="center">
      <v-img
        v-if="dataEl.type === 'image'"
        class="blatt-el-img mb-5 mx-n5 mx-md-0"
        :src="dataEl.datasource"
        :lazy-src="dataEl.datasource.replace('.png', '-thumbnail.png')"
        :alt="dataEl.content"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 " align="center" justify="center">
            <v-progress-circular indeterminate :size="80" color="primary"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-row>
    <!-- Chart -->
    <div class="mb-5">
      <chart-wrap
        v-if="dataEl.type == 'barchart' || dataEl.type == 'linechart' || dataEl.type == 'piechart'"
        :data-el="dataEl"
      ></chart-wrap>
    </div>
    <!-- Table -->
    <data-table v-if="dataEl.type === 'table'" :data-el="dataEl"></data-table>
    <!-- Map -->
    <bzr-map v-if="dataEl.type === 'map-poi'" class="mx-n5 mx-md-0" :poi-data="dataEl.data" :map-id="contentId"></bzr-map>
  </div>
</template>

<script>
import chartWrap from '~/components/bzr/contentElements/chartWrap.vue'
import dataTable from '~/components/bzr/contentElements/dataTable.vue'
import bzrMap from '~/components/maps/bzrMap.vue'

export default {
  components: {
    chartWrap,
    bzrMap,
    dataTable
  },
  props: {
    dataEl: { type: Object, default: null },
    contentId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    txt() {
      return this.dataEl.content.replace(/&/g, '&amp;').replace(/"/g, "'")
    }
  },
  methods: {}
}
</script>

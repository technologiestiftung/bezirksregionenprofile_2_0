<template>
  <div v-if="dataEl">
    <!-- Title -->
    <h4 v-if="dataEl.type === 'titel'" class="blatt-el-titel">
      {{ dataEl.content }}
    </h4>
    <!-- Title -->
    <h5 v-else-if="dataEl.type === 'titel-sm'" class="blatt-el-titel-sm">
      {{ dataEl.content }}
    </h5>
    <!-- Text -->
    <client-only v-else-if="dataEl.type === 'text'">
      <div class="blatt-el-text" v-html="$md.render(dataEl.content)"></div>
    </client-only>
    <!-- Image -->
    <div v-else-if="dataEl.type === 'image'">
      <h4 v-if="dataEl.content != ''">{{ dataEl.content }}</h4>
      <figure class="pb-6">
        <v-row align="center" justify="center">
          <v-img
            class="blatt-el-img mb-5 mx-n5 mx-md-0"
            :src="dataEl.datasource"
            :lazy-src="dataEl.datasource.replace('.png', '-thumbnail.png')"
            :alt="dataEl.alt"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0 " align="center" justify="center">
                <v-progress-circular indeterminate :size="80" color="primary"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-row>
        <figcaption v-if="dataEl.source">{{ dataEl.source }}</figcaption>
      </figure>
    </div>
    <!-- Chart -->
    <div v-else-if="dataEl.type == 'barchart' || dataEl.type == 'linechart'" :data-el="dataEl" class="mb-5">
      <chart-wrap></chart-wrap>
    </div>
    <!-- Table -->
    <data-table v-else-if="dataEl.type === 'table'" :data-el="dataEl" class="pb-6"></data-table>
    <!-- Map -->
    <bzr-map v-else-if="dataEl.type === 'map-poi'" class="mx-n5 mx-md-0" :poi-data="dataEl.data" :map-id="contentId"></bzr-map>
    <pr-map v-else-if="dataEl.type === 'map-pr'" class="mx-n5 mx-md-0" :data="dataEl.data" :map-id="contentId"></pr-map>
  </div>
</template>

<script>
import chartWrap from '~/components/bzr/contentElements/chartWrap.vue'
import dataTable from '~/components/bzr/contentElements/dataTable.vue'
import bzrMap from '~/components/maps/bzrMap.vue'
import prMap from '~/components/maps/prMap.vue'

export default {
  components: {
    chartWrap,
    bzrMap,
    prMap,
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
  computed: {}
}
</script>

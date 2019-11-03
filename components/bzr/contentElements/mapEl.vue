<template>
  <div>
    <bzr-map
      v-if="dataEl.type === 'map-poi'"
      class="mx-n5 mx-md-0"
      :poi-data="dataEl.data"
      :map-id="contentId"
      map-type="content-map"
    ></bzr-map>
    <pr-map v-else class="mx-n5 mx-md-0" :data="dataEl.data" :map-id="contentId" map-type="content-map"></pr-map>
  </div>
</template>

<script>
import bzrMap from '~/components/maps/bzrMap.vue'
import prMap from '~/components/maps/prMap.vue'
export default {
  components: {
    bzrMap,
    prMap
  },
  props: {
    dataEl: {
      type: Object,
      default: null
    },
    contentId: {
      type: Number,
      default: null
    }
  }
}
</script>

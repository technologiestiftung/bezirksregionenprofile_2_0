<template>
  <div class="pb-6">
    <h5 v-show="dataEl.content !== ''" :id="'label-' + contentId">{{ dataEl.content }}</h5>
    <div role="application" :aria-labelledby="'label-' + contentId">
      <bzr-map
        v-if="dataEl.type === 'map-poi'"
        class="mx-n5 mx-md-0"
        :poi-data="dataEl.data"
        :map-id="contentId"
        map-type="content-map"
      ></bzr-map>
      <pr-map v-else class="mx-n5 mx-md-0" :data="dataEl.data" :map-id="contentId" map-type="content-map"></pr-map>
    </div>
    <small v-if="dataEl.source != ''" class="content-source">{{ dataEl.source }}</small>
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

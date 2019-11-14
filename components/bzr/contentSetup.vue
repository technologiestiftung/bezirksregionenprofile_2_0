<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component :is="componentName" v-if="componentName" :content-id="contentId" :data-el="dataEl" />
</template>

<script>
import * as components from '~/components/bzr/contentElements/'

export default {
  components,
  props: {
    dataEl: { type: Object, default: null },
    contentId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {}
  },
  computed: {
    // dynamic component names depending on type
    componentName() {
      if (this.dataEl.type === 'titel') {
        return 'title-el'
      } else if (this.dataEl.type === 'titel-sm') {
        return 'title-sm-el'
      } else if (this.dataEl.type === 'text') {
        return 'text-el'
      } else if (this.dataEl.type === 'image') {
        return 'image-el'
      } else if (this.dataEl.type === 'table') {
        return 'data-table-el'
      } else if (this.dataEl.type === 'barchart' || this.dataEl.type === 'linechart') {
        return 'chart-wrap-el'
      } else if (this.dataEl.type === 'map-poi' || this.dataEl.type === 'map-pr') {
        return 'map-el'
      } else {
        return null
      }
    }
  }
}
</script>

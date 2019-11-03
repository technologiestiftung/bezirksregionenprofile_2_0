<template>
  <div v-if="dataEl">
    <chart-line v-if="dataEl.type === 'linechart'" :data-sets="dataSets" :data="dataEl.data" :alt="dataEl.alt"></chart-line>
    <chart-bar v-if="dataEl.type === 'barchart'" :data-sets="dataSets" :data="dataEl.data" :alt="dataEl.alt"></chart-bar>
  </div>
</template>

<script>
import chartLine from '~/components/charts/chartLine.vue'
import chartBar from '~/components/charts/chartBar.vue'

export default {
  components: { chartLine, chartBar },
  props: {
    dataEl: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      colorPalette: ['#1E3791', '#04A6F0 ', '#64B9E6', '#E60032', '#ff4d73', '#ff99af', '#999999']
    }
  },
  computed: {
    dataSets() {
      if (this.dataEl && this.dataEl.data !== null) {
        const r = { labels: [], datasets: [] }
        this.dataEl.data.forEach((element) => {
          r.labels.push(element.label)
          let i = 0
          for (const [key] of Object.entries(element)) {
            if (key !== 'xlabel' && key !== 'ylabel' && key !== 'label') {
              if (typeof r.datasets[i] === 'undefined') {
                r.datasets.push({
                  data: [element[key]],
                  label: key,
                  borderColor: this.colorPalette[i],
                  backgroundColor: this.colorPalette[i],
                  fill: false
                })
              } else {
                r.datasets[i].data.push(element[key])
              }
              i++
            }
          }
        })
        return r
      } else {
        return null
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>

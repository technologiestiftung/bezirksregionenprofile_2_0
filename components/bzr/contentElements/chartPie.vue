<template>
  <div v-if="data" class="pie-chart-container">
    <client-only>
      <my-pie v-if="show" :data="dataSets" :options="options" :height="200"></my-pie>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    dataSets: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    options() {
      if (this.data) {
        return {
          responsive: true,
          legend: {
            position: 'bottom',
            display: true
          },
          title: {
            display: false
          }
        }
      } else {
        return null
      }
    },
    xLabel() {
      return this.data ? this.data[0].xlabel : null
    },
    yLabel() {
      return this.data ? this.data[0].ylabel : null
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

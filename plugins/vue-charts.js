import Vue from 'vue'
import { Line, Bar, Pie } from 'vue-chartjs'

Vue.component('my-line', {
  extends: Line,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
Vue.component('my-bar', {
  extends: Bar,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
Vue.component('my-pie', {
  extends: Pie,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  }
})

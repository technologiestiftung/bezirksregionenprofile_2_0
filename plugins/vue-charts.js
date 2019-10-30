import Vue from 'vue'
import { Line, Bar } from 'vue-chartjs'

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
    },
    alt: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
    this.$refs.canvas.setAttribute('role', 'img')
    this.$refs.canvas.setAttribute('aria-label', this.alt)
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
    },
    alt: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
    this.$refs.canvas.setAttribute('role', 'img')
    this.$refs.canvas.setAttribute('aria-label', this.alt)
  }
})

<template>
  <div class="mt-3 viz-bz">
    <svg :id="id">
      <rect x="0%" y="0%" width="100%" height="100%" class="background-rect" />
      <rect x="50%" y="0%" width="0%" height="100%" :class="[activeIndClass, 'ani-rect']" />

      <!-- delete label min and max as long as it is not correct with data -->
      <text x="0%" y="0%" class="label-top"></text>
      <!-- former min label -->
      <text x="100%" y="0%" class="label-top"></text>
      <!-- former min label -->
      <text x="100%" y="0%" class="label-top"></text>

      <text :id="compareSelectedName" x="50%" y="0%" class="label-top static">
        {{ compareSelectedName }} : {{ averageValue }}
      </text>
      <text x="50%" y="100%" :class="[activeIndClass, 'label', 'bzr']">{{ compareWidth }}</text>

      <line x1="50%" x2="50%" y1="100%" y2="0%" :class="[activeIndClass, 'compare-line']"></line>

      <line x1="0%" x2="0" y1="100%" y2="0%" class="tick"></line>
      <line x1="50%" x2="50%" y1="100%" y2="0%" class="tick"></line>
      <line x1="100%" x2="100%" y1="100%" y2="0%" class="tick"></line>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  props: {
    activeIndClass: { type: String, default: '' },
    indikatorValue: { type: Number, default: 0 },
    currentBzr: {
      type: Object,
      default: null
    },
    compareSelectedName: {
      type: String,
      default: 'Bezirk'
    },
    indikatorValuePercent: {
      type: Number,
      default: 0
    },
    activeInd: {
      type: Number,
      default: null
    },
    averageValue: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    compareWidth() {
      let s = 'Bezirk '
      if (this.currentBzr) {
        s = this.currentBzr.name
      }
      // make plus in front of positive numbers to indicate that its x % MORE
      const addPlus = this.indikatorValuePercent > 0 ? '+' : ''
      const percentValue = ' (' + addPlus + Math.round(this.indikatorValuePercent * 10) / 10 + '%)'
      return s + percentValue
    }
  },
  watch: {
    activeInd(val) {
      this.animate()
    },
    indikatorValuePercent(val) {
      this.animate()
    }
  },

  created() {},
  mounted() {
    this.animate()
  },
  methods: {
    getWidth() {
      return this.indikatorValuePercent / 2
    },
    animate() {
      const animationDuration = 1000

      d3.select('#' + this.id + ' .ani-rect')
        .interrupt()
        .transition()
      d3.select('#' + this.id + ' .bzr')
        .interrupt()
        .transition()
      d3.select('#' + this.id + ' .compare-line')
        .interrupt()
        .transition()

      d3.select('#' + this.id + ' .ani-rect')
        .attr('width', '0%')
        .attr('x', '50%')

      d3.select('#' + this.id + ' .compare-line')
        .attr('x1', '50%')
        .attr('x2', '50%')

      d3.select('#' + this.id + ' .bzr').attr('x', '50%')

      // if the indikator val is negative
      if (this.indikatorValuePercent < 0) {
        const invertedData = (this.indikatorValuePercent / 2) * -1

        // if the value is smaller than -100% then only draw the line until -5%
        const linePosition = this.indikatorValuePercent >= -100 ? 50 - invertedData + '%' : -5 + '%'

        d3.select('#' + this.id + ' .ani-rect')
          .transition()
          .duration(animationDuration)
          .attr('x', linePosition)
          .attr('width', this.indikatorValuePercent >= -100 ? invertedData + '%' : 55 + '%')

        d3.select('#' + this.id + ' .bzr')
          .transition()
          .duration(animationDuration)
          .attr('x', linePosition)

        d3.select('#' + this.id + ' .compare-line')
          .transition()
          .duration(animationDuration)
          .attr('x1', linePosition)
          .attr('x2', linePosition)
      } else {
        // if positive value

        // if the value is larger than +100% then only draw the line until +105%
        const linePosition = this.indikatorValuePercent <= 100 ? this.indikatorValuePercent / 2 + 50 + '%' : 105 + '%'

        d3.select('#' + this.id + ' .ani-rect')
          .transition()
          .duration(animationDuration)
          .attr('width', this.indikatorValuePercent <= 100 ? this.indikatorValuePercent / 2 + '%' : 55 + '%')
          .attr('x', '50%')

        d3.select('#' + this.id + ' .bzr')
          .transition()
          .duration(animationDuration)
          .attr('x', linePosition)

        d3.select('#' + this.id + ' .compare-line')
          .transition()
          .duration(animationDuration)
          .attr('x1', linePosition)
          .attr('x2', linePosition)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/variables';

.viz-bz {
  div {
    text-align: center;
  }

  svg {
    width: 100%;
    height: 50px;
    overflow: visible;
    display: inline-block;

    .background-rect {
      fill: white;
    }

    .tick {
      stroke: #333;
      stroke-width: 1;
      stroke-dasharray: 2;
    }

    .compare-line {
      stroke-width: 2;
      stroke: #333;
    }

    text {
      text-anchor: middle;
      font-size: 14px;
    }

    text.label-top {
      color: #333;
      transform: translate(0px, -7px);
      font-size: 14px;
    }

    text.label {
      transform: translate(0px, 20px);
    }

    text.static {
      color: #000;
      font-weight: 700;
    }

    .bzr {
      text-anchor: middle;
    }

    rect {
      // opacity:.85;
    }

    .ani-rect {
      fill-opacity: 0.8;
    }
  }

  .indGr1 {
    fill: $color-indGr1;
  }
  .indGr2 {
    fill: $color-indGr2;
  }
  .indGr3 {
    fill: $color-indGr3;
  }
  .indGr4 {
    fill: $color-indGr4;
  }
  .indGr5 {
    fill: $color-indGr5;
  }
  .indGr6 {
    fill: $color-indGr6;
  }

  .compare-line {
    stroke-width: 2px;
  }

  .indGr1.compare-line {
    stroke: $color-indGr1;
  }
  .indGr2.compare-line {
    stroke: $color-indGr2;
  }
  .indGr3.compare-line {
    stroke: $color-indGr3;
  }
  .indGr4.compare-line {
    stroke: $color-indGr4;
  }
  .indGr5.compare-line {
    stroke: $color-indGr5;
  }
  .indGr6.compare-line {
    stroke: $color-indGr6;
  }
}
</style>

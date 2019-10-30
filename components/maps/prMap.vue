<template>
  <div class="h-100">
    <div class="map-container">
      <div class="map-container-inner">
        <transition name="fade">
          <div v-if="!mapLoaded" class="map-loader">
            <v-progress-circular :size="80" color="primary" indeterminate></v-progress-circular>
          </div>
        </transition>
        <div :id="mapEl" class="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bbox from '@turf/bbox'

export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: null
    },
    mapId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      selected: null,
      bounds: null,
      geojsonData: null,
      mapLoaded: false,
      featureName: 'PLRNAME'
    }
  },
  computed: {
    ...mapState(['mapStyle', 'mapColors', 'currentBz', 'currentBzr', 'bzBzrPrData']),
    mapEl() {
      return `map-${this.mapId}`
    },
    // filter the gejson data of current bzr only
    geoJsonBzr() {
      const r = { features: [], type: 'FeatureCollection' }
      if (this.geojsonData) {
        this.geojsonData.features.forEach((element) => {
          if (element.properties.BZRNAME === this.currentBzr.name) {
            r.features.push(element)
          }
        })
      }
      return r
    }
  },
  mounted() {
    this.loadGeojson()
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    // load appropriate geojson data depending on mapType
    async loadGeojson() {
      this.geojsonData = await this.$axios.$get(process.env.apiUrl + `/generated/geojson/geojson_${this.currentBz.url}_pr.json`)
      this.createMap()
    },
    centerMap() {
      this.map.fitBounds(this.bounds, {
        padding: 25,
        duration: 0
      })
    },
    handleResize() {
      this.centerMap()
    },
    createMap() {
      // get the bounds of the geojson
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
      let selectedBbox = bbox(this.geoJsonBzr)
      this.bounds = selectedBbox = [[selectedBbox[0], selectedBbox[1]], [selectedBbox[2], selectedBbox[3]]]

      const mapColor = this.data[0].color
      const mapUnit = this.data[0].einheit
      const mapData = {}
      let maxValue = []
      let totalValue = 0
      for (let i = 0; i < this.data.length; i++) {
        mapData[this.data[i].id] = {}
        mapData[this.data[i].id].wert = this.data[i].wert
        maxValue.push(Number(this.data[i].wert))
        totalValue += Number(this.data[i].wert)
      }

      // give each geom a value/wert
      maxValue = Math.max(...maxValue)
      for (let i = 0; i < this.geoJsonBzr.features.length; i++) {
        this.geoJsonBzr.features[i].properties.wert =
          mapData[Number(this.geoJsonBzr.features[i].properties.spatial_name)].wert / totalValue
      }

      mapboxgl.accessToken = ''
      this.map = new mapboxgl.Map({
        container: this.mapEl,
        style: this.mapStyle,
        center: [13.391, 52.519],
        zoom: 8,
        pitch: 0,
        minZoom: 2,
        maxZoom: 20,
        interactive: false
      })

      this.map.on('load', () => {
        setTimeout(() => {
          this.mapLoaded = true
        }, 400)

        this.map.fitBounds(this.bounds, {
          padding: 50,
          duration: 0
        })

        this.map.addSource('geojsonSource', {
          type: 'geojson',
          data: this.geoJsonBzr
        })

        this.map.addLayer({
          id: 'outline',
          source: 'geojsonSource',
          type: 'line',
          paint: {
            'line-color': mapColor,
            'line-width': 2
          }
        })

        this.map.addLayer({
          id: 'fill-light',
          source: 'geojsonSource',
          type: 'fill',
          paint: {
            'fill-color': mapColor,
            'fill-opacity': ['get', 'wert']
          }
        })

        this.map.addLayer({
          id: 'fill-hover',
          type: 'fill',
          source: 'geojsonSource',
          paint: {
            'fill-color': mapColor,
            'fill-opacity': 0.6
          },
          filter: ['==', this.featureName, '']
        })
      })

      // popup
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: 'bottom-left'
      })

      this.map.on('mousemove', 'fill-light', (e) => {
        // Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = 'pointer'

        const coordinates = e.lngLat
        const plrName = e.features[0].properties.PLRNAME
        const data = mapData[Number(e.features[0].properties.spatial_name)].wert
        const description = `${plrName}<br>${data} ${mapUnit}`
        popup
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.map)
      })

      this.map.on('mouseleave', 'fill-light', () => {
        this.map.getCanvas().style.cursor = ''
        popup.remove()
      })

      this.map.on('mousemove', 'fill-light', (e) => {
        this.map.setFilter('fill-hover', ['==', this.featureName, e.features[0].properties[this.featureName]])
      })

      // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
      this.map.on('mouseleave', 'fill-light', () => {
        this.map.setFilter('fill-hover', ['==', this.featureName, ''])
        this.selected = null
      })
    }
  }
}
</script>

<style lang="scss">
.map-container {
  position: relative;
  .map-container-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    .map-loader {
      background-color: #efefef;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

// map is a responsive square
.map-container {
  padding-bottom: 80%;
  .map {
    height: 100%;
    width: 100%;
  }
}
</style>

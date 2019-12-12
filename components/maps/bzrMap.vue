<template>
  <div class="h-100">
    <div :class="mapType" class="map-container">
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
import toUrl from '~/assets/js/tourl.js'

export default {
  components: {},
  props: {
    poiData: {
      type: Array,
      default: null
    },
    mapId: {
      type: Number,
      default: 0
    },
    mapType: {
      type: String,
      default: 'bezirksregion'
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
      if (this.geojsonData && this.currentBzr !== null) {
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

      // add poi layer after load
      this.map.on('idle', () => {
        // poi markers
        if (this.poiData && !this.map.getLayer('poi-layer')) {
          const pointFeatures = {
            type: 'FeatureCollection',
            features: []
          }

          for (let i = 0; i < this.poiData.length; i++) {
            const point = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [this.poiData[i].lng, this.poiData[i].lat]
              },
              properties: {
                text: this.poiData[i].text,
                color: this.poiData[i].color || '#1E3791'
              }
            }
            pointFeatures.features.push(point)
          }

          this.map.addLayer({
            id: 'poi-layer',
            type: 'circle',
            source: {
              type: 'geojson',
              data: pointFeatures
            },
            paint: {
              'circle-color': ['get', 'color'],
              'circle-radius': 8,
              'circle-opacity': 0.8
            }
          })

          this.map.on('mousemove', 'poi-layer', (e) => {
            // Change the cursor style as a UI indicator.
            this.map.getCanvas().style.cursor = 'default'

            const coordinates = e.lngLat
            const text = e.features[0].properties.text
            const color = e.features[0].properties.color

            popup
              .setLngLat(coordinates)
              .setHTML(text)
              .addTo(this.map)
            document.getElementsByClassName('mapboxgl-popup-content')[0].style.borderLeft = '2px solid ' + color
          })

          this.map.on('mouseleave', 'poi-layer', () => {
            this.map.getCanvas().style.cursor = ''
            popup.remove()
          })
        }
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
            'line-color': this.mapColors[0],
            'line-width': 2
          }
        })

        this.map.addLayer({
          id: 'fill-light',
          source: 'geojsonSource',
          type: 'fill',
          paint: {
            'fill-color': this.mapColors[0],
            'fill-opacity': 0.1
          }
        })

        this.map.addLayer({
          id: 'fill-hover',
          type: 'fill',
          source: 'geojsonSource',
          paint: {
            'fill-color': this.mapColors[1],
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

      if (!this.poiData) {
        this.map.on('mousemove', 'fill-light', (e) => {
          // Change the cursor style as a UI indicator.
          this.map.getCanvas().style.cursor = 'pointer'

          const coordinates = e.lngLat
          const description = e.features[0].properties[this.featureName]
          this.selected = toUrl(e.features[0].properties[this.featureName])
          this.$emit('select-event', this.selected)
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
}
</script>

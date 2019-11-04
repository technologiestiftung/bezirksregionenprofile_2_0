<template>
  <div class="h-100">
    <div class="map-container" :class="mapType" role="application" :aria-label="ariaLabel">
      <div class="map-container-inner">
        <transition name="fade">
          <div v-if="!mapLoaded" class="map-loader">
            <v-progress-circular :size="80" color="primary" indeterminate></v-progress-circular>
          </div>
        </transition>
        <div id="map"></div>
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
    // item hover over in dropdown
    hoverItem: {
      type: String,
      default: null
    },
    // bezirke, bezirk
    mapType: {
      type: String,
      default: 'bezirke'
    }
  },
  data() {
    return {
      selected: null,
      bounds: null,
      geoData: null,
      mapLoaded: false
    }
  },
  computed: {
    ...mapState(['mapStyle', 'mapColors', 'bezirkeGeojson', 'currentBz', 'currentBzr', 'bzBzrPrData']),
    featureName() {
      if (this.mapType === 'bezirke') {
        return 'Gemeinde_name'
      } else {
        return 'BZR_NAME'
      }
    },
    geojsonData() {
      if (this.mapType === 'bezirke') {
        return this.bezirkeGeojson
      } else {
        return this.geoData
      }
    },
    selectedUrl() {
      if (this.mapType === 'bezirke') {
        return this.selected
      } else {
        return `${this.currentBz.url}/${this.selected}`
      }
    },
    ariaLabel() {
      return this.currentBz
        ? `Übersichtskarte des Bezriks ${this.currentBz.name} mit allen Bezirksregionen`
        : 'Übersichtskarte Berlin mit allen Bezirken'
    }
  },
  watch: {
    // apply filter when hoverItem changes
    hoverItem(e) {
      this.map.setFilter('fill-hover', ['==', this.featureName, e])
    },
    // highlight area when selected
    currentBzr() {
      // when map is initialized
      if (this.map) {
        if (this.currentBzr) {
          this.map.setFilter('fill-select', ['==', this.featureName, this.currentBzr.name])
        } else {
          this.map.setFilter('fill-select', ['==', this.featureName, ''])
        }
      }
    }
  },
  mounted() {
    this.loadGeojson()
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    // load appropriate geojson data depending on mapType
    async loadGeojson() {
      // index map with bezirke only
      if (this.mapType === 'bezirke') {
        await this.$store.dispatch('loadBezirkeGeojson')
      }
      // map of a bezirk and its regions
      else {
        this.geoData = await this.$axios.$get(process.env.apiUrl + `/generated/geojson/geojson_${this.currentBz.url}_bzr.json`)
      }
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
      let selectedBbox = bbox(this.geojsonData)
      this.bounds = selectedBbox = [[selectedBbox[0], selectedBbox[1]], [selectedBbox[2], selectedBbox[3]]]

      mapboxgl.accessToken = ''
      this.map = new mapboxgl.Map({
        container: 'map',
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
          data: this.geojsonData
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
          id: 'fill-select',
          source: 'geojsonSource',
          type: 'fill',
          paint: {
            'fill-color': this.mapColors[1],
            'fill-opacity': 0.7
          },
          filter: ['==', this.featureName, '']
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

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: 'bottom-left'
      })

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

      this.map.on('click', 'fill-light', (e) => {
        this.selected = toUrl(e.features[0].properties[this.featureName])
        if (this.mapType === 'bezirke') {
          this.$router.push({ path: this.selectedUrl })
        } else {
          this.$store.commit('setCurrentBzr', this.currentBz.bzr[this.selected])
        }
      })

      // for mapType 'bezirk' we need to reset selected bzr when clicked background map
      if (this.mapType === 'bezirk') {
        this.map.on('click', (e) => {
          const feature = this.map.queryRenderedFeatures(e.point, {
            layers: ['fill-light']
          })
          if (feature.length === 0) {
            this.$store.commit('setCurrentBzr', null)
          }
        })
      }
    }
  }
}
</script>

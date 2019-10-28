<template>
  <div :id="chartId" class="vis-map-plr"></div>
</template>

<script>
import { mapState } from 'vuex'
import bbox from '@turf/bbox'

export default {
  computed: {
    ...mapState(['nostyle', 'planungsraeume', 'mapColors'])
  },
  components: {},
  mounted() {
    this.createMap()
  },
  // data(){
  //     return{
  //       selected: this.bezirk,

  //     }
  // },
  props: ['bzrName', 'visData', 'chartId'],
  methods: {
    createMap() {
      // //get mapbox library
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
      require('mapbox-gl/dist/mapbox-gl.css')

      // prepair the data
      const bezirksregion = this.bzrName

      // make deep copy, so the values dont override one another
      let selectedPlr = JSON.parse(
        JSON.stringify(
          this.planungsraeume.features.filter(function(obj) {
            return obj.properties.BZRNAME == bezirksregion
          })
        )
      )

      const mapColor = this.visData[0].color
      const mapUnit = this.visData[0].einheit
      const mapData = {}
      let maxValue = []
      let totalValue = 0
      for (var i = 0; i < this.visData.length; i++) {
        mapData[this.visData[i].id] = {}
        mapData[this.visData[i].id].wert = this.visData[i].wert

        maxValue.push(Number(this.visData[i].wert))
        totalValue += Number(this.visData[i].wert)
      }

      // give each geom a value/wert
      maxValue = Math.max(...maxValue)
      const values = []
      for (var i = 0; i < selectedPlr.length; i++) {
        selectedPlr[i].properties.wert =
          mapData[Number(selectedPlr[i].properties.spatial_name)].wert /
          totalValue
      }

      selectedPlr = {
        type: 'FeatureCollection',
        features: selectedPlr
      }

      let selectedBbox = bbox(selectedPlr)
      selectedBbox = [
        [selectedBbox[0], selectedBbox[1]],
        [selectedBbox[2], selectedBbox[3]]
      ]

      mapboxgl.accessToken = ''
      const map = new mapboxgl.Map({
        container: this.chartId,
        style: this.nostyle,
        center: [13.391, 52.519],
        zoom: 5,
        pitch: 0,
        minZoom: 2,
        maxZoom: 20,
        interactive: false
      })

      map.on('load', () => {
        // to load directly
        // https://github.com/mapbox/mapbox-gl-js/issues/1970
        map.fitBounds(selectedBbox, {
          padding: { bottom: 10, left: 10, right: 10, top: 10 },
          // linear: true,
          duration: 0
        })

        map.addSource('planungsraeume', {
          type: 'geojson',
          data: selectedPlr
        })

        map.addLayer({
          id: 'planungsraeume-hover',
          type: 'line',
          source: 'planungsraeume',
          paint: {
            'line-color': mapColor,
            'line-opacity': 0.8,
            'line-width': 2
          },
          filter: ['==', 'PLRNAME', '']
        })

        map.addLayer({
          id: 'planungsraeume',
          type: 'fill',
          source: 'planungsraeume',
          paint: {
            'fill-color': mapColor,
            'fill-opacity': ['get', 'wert']
          }
        })
      })

      // // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: 'bottom-left'
      })

      map.on('mousemove', 'planungsraeume', (e) => {
        // Change the cursor style as a UI indicator.
        // map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.lngLat
        const plrName = e.features[0].properties.PLRNAME
        const data = mapData[Number(e.features[0].properties.spatial_name)].wert
        const description = plrName + '<br>' + data + ' ' + mapUnit

        popup
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map)

        document.getElementsByClassName(
          'mapboxgl-popup-content'
        )[0].style.borderLeft = '2px solid ' + mapColor
      })

      map.on('mouseleave', 'planungsraeume', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
      })

      map.on('mousemove', 'planungsraeume', (e) => {
        map.setFilter('planungsraeume-hover', [
          '==',
          'PLRNAME',
          e.features[0].properties.PLRNAME
        ])
      })

      // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
      map.on('mouseleave', 'planungsraeume', () => {
        map.setFilter('planungsraeume-hover', ['==', 'PLRNAME', ''])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vis-map-plr {
  width: 100%;
  height: 300px;
  // position: absolute;
}
</style>

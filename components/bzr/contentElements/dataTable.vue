<template>
  <div>
    <div v-if="dataEl.data && dataEl.data.length > 0" class="pt-4 pb-8">
      <v-data-table hide-default-footer :headers="headers" :items="dataEl.data" :items-per-page="20"></v-data-table>
    </div>
    <div v-else>
      <v-alert type="error"> Data for table is missing. {{ dataEl.datasource }} </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dataEl: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    headers() {
      if (this.dataEl.data && this.dataEl.data.length > 0) {
        const r = []
        for (const [key] of Object.entries(this.dataEl.data[0])) {
          r.push({
            text: key,
            value: key
          })
        }
        return r
      } else {
        return null
      }
    }
  }
}
</script>

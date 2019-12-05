<template>
  <div class="pb-6 mx-n5 mx-md-0">
    <h5 v-if="dataEl.content != ''">{{ dataEl.content }}</h5>
    <figure class="pb-6">
      <v-row align="center" justify="center">
        <v-img :src="dataEl.datasource" :lazy-src="dataEl.datasource.replace('.png', '-thumbnail.png')" :alt="dataEl.alt">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0 " align="center" justify="center">
              <v-progress-circular :size="80" indeterminate color="primary"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-row>
      <figcaption v-if="dataEl.source != ''" class="content-source">{{ dataEl.source }}</figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    dataEl: {
      type: Object,
      default: null
    }
  }
}
</script>

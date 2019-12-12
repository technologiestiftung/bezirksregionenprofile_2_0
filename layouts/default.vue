<template>
  <v-app>
    <v-content class="pa-0">
      <v-container fluid style="padding-left: 20px; padding-right:20px;">
        <nuxt />
      </v-container>
    </v-content>
    <page-footer></page-footer>
  </v-app>
</template>

<script>
import pageFooter from '~/components/pageFooter.vue'
export default {
  components: {
    pageFooter
  },
  data() {
    return {}
  }
}
</script>

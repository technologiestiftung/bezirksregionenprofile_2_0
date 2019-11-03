<template>
  <header>
    <v-row class=" justify-space-between align-end">
      <v-col cols="12" class="" md="">
        <h1>
          <nuxt-link to="/">
            <span class="d-none d-md-block">Berliner Bezirksregionenprofile</span>
            <img class="d-md-none" src="/img/logo.svg" alt="Berliner Bezirksregionenprofile" />
          </nuxt-link>
        </h1>
      </v-col>
      <v-col class="text-md-right">
        <nuxt-link to="/about" class="pr-5">Über den Monitor</nuxt-link>
        <a href="https://www.technologiestiftung-berlin.de/de/stiftung/kontakt-anfahrt/" target="_blank">Kontakt</a>
      </v-col>
    </v-row>

    <v-breadcrumbs v-if="$route.path !== '/'" :items="items" large></v-breadcrumbs>
  </header>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    items() {
      const a = [{ text: 'Home', to: '/' }]
      if (this.$route.path === '/about') {
        a.push({
          href: '',
          text: 'Über den Monitor'
        })
      }
      if (this.$route.params.bz !== undefined) {
        const bData = this.$store.state.bzBzrPrData
        if (this.$route.params.bzr !== undefined) {
          a.push({
            to: '/' + bData[this.$route.params.bz].url,
            text: bData[this.$route.params.bz].name,
            disabled: false,
            exact: true
          })
          a.push({
            to: '/' + bData[this.$route.params.bz].bzr[this.$route.params.bzr].url,
            text: bData[this.$route.params.bz].bzr[this.$route.params.bzr].name,
            disabled: true
          })
        } else {
          a.push({
            to: '/' + bData[this.$route.params.bz].url,
            text: bData[this.$route.params.bz].name,
            disabled: true
          })
        }
      }
      return a
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
header {
  a {
    color: #000;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  h1 a {
    &:hover {
      text-decoration: none;
    }
  }

  img {
    width: 100%;
    max-width: 480px;
    height: auto;
  }
}
</style>

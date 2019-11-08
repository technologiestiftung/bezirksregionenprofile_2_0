<template>
  <v-footer class="grey lighten-2" app :fixed="false">
    <v-container fluid class="px-3 pb-8 px-sm-5 px-md-8 px-lg-12">
      <v-row no-gutters>
        <v-col>
          <ul class="d-flex justify-center justify-lg-end social-icons">
            <li>
              <a target="_blank" href="https://twitter.com/tsbberlin"><v-icon>mdi-twitter</v-icon></a>
            </li>
            <li>
              <a target="_blank" href="https://www.facebook.com/Technologiestiftung/"><v-icon>mdi-facebook-box</v-icon></a>
            </li>
            <li>
              <a target="_blank" href="https://github.com/technologiestiftung/"><v-icon>mdi-github-circle</v-icon></a>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <div class="d-flex flex-column flex-lg-row">
            <div class="d-flex flex-column flex-lg-row">
              <img class="mr-6" alt="Technologiestiftung Berlin Logo" src="/img/tsb-logo-content.svg" />
              <address class="mt-4 mt-lg-0 ml-2">
                Grunewaldstraße 61-62<br />
                10825 Berlin<br />
                <a href="mailto:info@technologiestiftung-berlin.de">info@technologiestiftung&#8209;berlin.de</a><br />
              </address>
            </div>

            <ul class="pl-2 mt-7 mt-lg-0 ml-lg-12 mr-lg-12">
              <li>
                <a target="_blank" href="https://www.technologiestiftung-berlin.de/de/stiftung/kontakt-anfahrt/">Kontakt</a>
              </li>
              <li>
                <a target="_blank" href="https://www.technologiestiftung-berlin.de/de/impressum">Impressum</a>
              </li>
              <li>
                <a target="_blank" href="https://www.technologiestiftung-berlin.de/de/datenschutz/">Datenschutz</a>
              </li>
            </ul>
            <ul class="pl-2 mt-7 mt-lg-0 ">
              <li>
                <nuxt-link to="/about">Über den Monitor</nuxt-link>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
// footer
footer.v-footer {
  position: relative !important;
  ul {
    list-style: none;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #000;
    word-break: keep-all;
  }

  img {
    width: 90px;
    height: auto;
    margin-top: -15px;
  }

  .social-icons {
    li {
      padding-left: 20px;
      i {
        font-size: 40px;
      }
    }
  }
}
</style>

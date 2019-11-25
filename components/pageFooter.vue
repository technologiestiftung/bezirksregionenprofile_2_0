<template>
  <v-footer class="grey lighten-2" app :fixed="false">
    <v-container fluid class="px-3 pb-8 px-sm-5 px-md-8 px-lg-12">
      <v-row no-gutters>
        <v-col>
          <div class="d-flex flex-column flex-lg-row">
            <ul class="pl-2 mt-7 mt-lg-0 ml-lg-12 mr-lg-12">
              <li>
                <a target="_blank" href="https://www.berlin.de/ba-tempelhof-schoeneberg/allgemeine-infos/artikel.350989.php"
                  >Impressum</a
                >
              </li>
              <li>
                <a target="_blank" href="https://www.berlin.de/ba-tempelhof-schoeneberg/datenschutzerklaerung.700798.php"
                  >Datenschutz</a
                >
              </li>
              <li>
                <nuxt-link to="/about">Über das Projekt</nuxt-link>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
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

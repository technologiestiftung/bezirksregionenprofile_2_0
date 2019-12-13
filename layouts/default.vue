<template>
  <v-app>
    <v-content class="pa-0">
      <v-container fluid style="padding-left: 20px; padding-right:20px;">
        <div class="row">
          <div>
            <div class="html5-header content-header" role="banner">
              <div class="row">
                <div class="span5">
                  <div class="html5-section section-logo without-logo">
                    <div class="html5-section text">
                      <a href="/" title="Link führt zur Startseite von 'Bezirksregionenprofile von Tempelhof Schöneberg'">
                        <span class="title">Bezirksregionenprofile</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="span7"></div>
              </div>
            </div>
            <div class="row">
              <div class="span12">
                <span class="mobile-blue-line hidden-desktop hidden-tablet"></span>
                <div class="content-navi-wrapper navbar hidden-phone">
                  <div class="html5-nav content-navi-top navbar-inner">
                    <nav class="nav-collapse mainnav-collapse collapse" aria-label="Hauptnavigation">
                      <!-- 3 template-path: tmpl_default/navi/navi_top_startseite.php -->
                      <!-- template start: navi-top-start -->

                      <ul class="nav level1 pl-0">
                        <li class="has-submenu">
                          <nuxt-link class="active" to="/">Kernindikatoren</nuxt-link>
                        </li>
                        <li class="has-submenu">
                          <nuxt-link to="/about">Über das Projekt</nuxt-link>
                        </li>
                      </ul>

                      <!-- /template end: navi-top-start -->
                    </nav>

                    <!-- 4 template-path: tmpl_default/header/beberlin.php -->
                    <div class="beberlin">
                      <img alt="Bild zeigt: Logo beBerlin" src="/berlinde/images/logo_beberlin_darkblue.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

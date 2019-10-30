// import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  // environment specific variables can be loaded from the package.json
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + 'Berliner Bezirksregionen Monitor',
    title: 'Berliner Bezirksregionen Monitor' || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#E60032'
  },
  /*
   ** Global CSS
   */
  css: ['mapbox-gl/dist/mapbox-gl.css', '~/assets/map.scss', '~/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  // plugins: [{ src: '~/plugins/mapbox', mode: 'client' }],
  plugins: [{ src: '~plugins/vue-charts.js', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],
  // setup markdownit
  markdownit: {
    preset: 'default',
    injected: true,
    breaks: true, // Convert '\n' in paragraphs into <br>
    html: true // Enable HTML tags in source
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {},
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#223A8F',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  },
  // generate the site links
  generate: {
    // routes: ['tempelhofschoeneberg/schoenebergnord']
    async routes() {
      const res = await axios.get(process.env.API_URL + '/generated/routes.json')
      return res.data
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true
        }
      })
    }
  }
}

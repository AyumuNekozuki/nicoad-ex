export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ニコニ広告ex. - ニコニ広告をもっと便利に',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { 'http-equiv': 'origin-trial', content: 'AmIWMhsXUBBPyInXaOnehOlXGNlo9Rh9kMG51HDKLP9cvrpKIkomyUfpfX+0PY5EdvmNsyCwykVRXBOYyaXOrAUAAAB+eyJvcmlnaW4iOiJodHRwczovL25pY29hZGV4Lm5la296dWtpLm1lOjQ0MyIsImZlYXR1cmUiOiJVbnJlc3RyaWN0ZWRTaGFyZWRBcnJheUJ1ZmZlciIsImV4cGlyeSI6MTY1ODg3OTk5OSwiaXNTdWJkb21haW4iOnRydWV9'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-helmet',
    'nuxt-webfontloader',
  ],
  helmet: {
    frameguard: false,
    hidePoweredBy: true
  },

  webfontloader: {
    google: {
      families: [
        'Noto+Sans+JP:400,700',
        'M+PLUS+Rounded+1c:100,300,400,500,700,800,900'
      ]
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    prefix: '/',
    proxy: true,
  },
  proxy: {
    '/api_nicoad_campaign/': {
      target: 'https://api.nicoad.nicovideo.jp',
      pathRewrite: {
        '^/api_nicoad_campaign/': '/v1/'
      }
    },
    '/api_nekozuki_ogpapi/': {
      target: 'https://api.nekozuki.me',
      pathRewrite: {
        '^/api_nekozuki_ogpapi/': '/api/'
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

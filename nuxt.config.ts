import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  env: {
    strapiURL: process.env.strapiURL || 'http://localhost:1337',
  },
  auth: {
    cookie: {
      options: {
        expires: 365,
        secure: true,
      },
    },
    localStorage: null,
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/',
      dashboard: '/dashboard',
      profile: '/profile',
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1800,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/auth/token', method: 'post' }, // login: { url: '/auth/token', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' },
        },
        autoLogout: true,
      },
    },
    plugins: ['@/plugins/axios/response-interceptor'],
  },
  build: {
    extractCSS: true,
    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[local]_[hash:base64:4]',
        },
      },
    },
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    transpile: ['vee-validate'],
  },
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api'],
  css: [],
  head: {
    // title: process.env.npm_package_name || '',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },
  i18n: {
    strategy: 'no_prefix',
    vueI18n: '@/plugins/vue-i18n/vue-i18n',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'es',
        file: 'es.json',
      },
      {
        code: 'de',
        file: 'de.json',
      },
      {
        code: 'pt',
        file: 'pt.json',
      },
      {
        code: 'zh-cn',
        file: 'zh-cn.json',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '../i18n/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieDomain: null,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
      syncMessages: false,
      syncRouteParams: true,
    },
  },
  loading: { color: '#cd235b' },
  loadingIndicator: {
    name: 'circle',
    color: '#cd235b',
    background: 'white',
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    'nuxt-i18n',
    '@stun3r/nuxt-strapi-sdk',
    '@nuxtjs/strapi',
  ],
  plugins: [
    { src: '@/plugins/vee-validate/vee-validate' },
    { src: '@/plugins/vuex-persist/vuex-persist.client' },
    { src: '@/plugins/vuex-persist/vuex-persist.server' },
  ],
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.baseURL || 'http://localhost:3000',
    },
  },
  privateRuntimeConfig: {},
  pwa: {
    icon: {
      fileName: 'images/bancannapp.png',
    },
  },
  srcDir: 'src',
  serverMiddleware: ['@/api/index.ts'],
  telemetry: false,
};

export default config;

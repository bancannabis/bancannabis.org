import { VuesionConfig } from '@vuesion/models';
import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  apollo: {
    clientConfigs: {
      default: '@/plugins/apollo/apollo-client-config.ts',
    },
  },
  env: {
    strapiURL: process.env.strapiURL || 'http://localhost:1337',
    ethProviderURL: process.env.ethProviderURL || 'wss://rinkeby.infura.io/ws/v3/0c90cede2053432cac408091c5d57039',
    STRAPI_URL: process.env.STRAPI_URL,
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
          login: { url: '/auth/local', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' },
          register: { url: '/auth/local/register', method: 'post' },
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
          localIdentName: process.env.NODE_ENV !== 'production' ? '[local]_[hash:base64:4]' : '[hash:base64:4]',
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
    transpile: ['vee-validate', '@vue/apollo-composable'],
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/eslint-module',
    '@nuxtjs/html-validator',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  css: ['uikit/dist/css/uikit.min.css', 'uikit/dist/css/uikit.css', 'assets/cssBlog/main.css'],
  head: {
    title: process.env.npm_package_name || '',
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700,800|Lora:300,400,500,600,700,800&display=swap',
      },
    ],
  },
  htmlValidator: {
    usePrettier: false,
    options: {
      extends: ['html-validate:document', 'html-validate:recommended', 'html-validate:standard'],
      rules: {
        'svg-focusable': 'off',
        'no-unknown-elements': 'error',
        'void-style': 'off',
        'no-trailing-whitespace': 'off',
        'require-sri': 'off',
        'attribute-boolean-style': 'off',
        'doctype-style': 'off',
        'no-inline-style': 'off',
      },
    },
  },
  i18n: {
    strategy: 'no_prefix',
    vueI18n: '@/plugins/vue-i18n/vue-i18n',
    locales: VuesionConfig.i18n.locales,
    defaultLocale: VuesionConfig.i18n.defaultLocale,
    lazy: true,
    langDir: '../i18n/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieDomain: null,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: VuesionConfig.i18n.defaultLocale,
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
    '@nuxtjs/apollo',
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    'nuxt-winston-log',
    '@nuxtjs/robots',
    '@nuxtjs/strapi',
    '@nuxtjs/markdownit',
  ],
  plugins: [
    { src: '@/plugins/apollo/provide-apollo-client' },
    { src: '@/plugins/vee-validate/vee-validate' },
    { src: '@/plugins/vuex-persist/vuex-persist.client' },
    { src: '@/plugins/vuex-persist/vuex-persist.server' },
    { src: '@/plugins/pwa/update.client' },
    { src: '@/plugins/vue-gtag/vue-gtag' },
    { src: '@/plugins/strapi/strapi' },
    { src: '@/plugins/uikit.js', ssr: false },
  ],
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    entities: [
      {
        name: 'articles',
        type: 'collection',
      },
      {
        name: 'categories',
        type: 'collection',
      },
      {
        name: 'homepage',
        type: 'single',
      },
      {
        name: 'global',
        type: 'single',
      },
    ],
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    html: true,
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.baseURL || 'http://localhost:3000',
    },
    apollo: {
      baseURL: process.env.graphQlEndpoint || 'https://rickandmortyapi.com/graphql',
    },
  },
  privateRuntimeConfig: {},
  pwa: {
    icon: {
      fileName: 'images/bancannapp.png',
    },
    workboxOptions: {
      skipWaiting: true,
    },
    manifest: {
      name: 'Bancannabis.org',
      short_name: 'bancannabis',
      theme_color: '#440a67',
      lang: 'us',
      useWebmanifestExtension: false,
    },
  },
  robots: {
    UserAgent: '*',
    Disallow: '/*?*',
    Allow: '/',
  },
  router: {
    middleware: ['auth'],
  },
  srcDir: 'src',
  serverMiddleware: ['@/api/index.ts'],
  telemetry: false,
  winstonLog: {
    logPath: './logs',
    logName: `${process.env.NODE_ENV}.log`,
    autoCreateLogPath: true,
    useDefaultLogger: true,
    skipRequestMiddlewareHandler: false,
    skipErrorMiddlewareHandler: false,
  },
};

export default config;

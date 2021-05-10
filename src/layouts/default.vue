<template>
  <div id="app" :class="$style.app">
    <vue-notification-stack />

    <vue-nav-bar>
      <template v-if="user" slot="middle"> Hello, {{ user.name }}! </template>

      <vue-button
        slot="right"
        :class="$style.button"
        style="background:#efe58a;"
        color="primary"
        @click="redirectToSale()"
      >
        {{ $t('auth.LoginForm.bca') }}
      </vue-button>
      <vue-button v-if="!loggedIn" slot="right" color="primary" @click="showLoginModal = true">
        {{ $t('auth.LoginForm.title') }}
      </vue-button>
      <vue-button v-if="loggedIn" slot="right" color="primary" @click="onLogoutClick"> Logout </vue-button>
    </vue-nav-bar>

    <nuxt :class="$style.content" />

    <vue-footer-Suscribe v-if="footer" />

    <vue-sidebar>
      <vue-sidebar-group title="Languages">
        <vue-sidebar-group-item>
          <vue-select id="lang" name="lang" :items="languages" :value="$i18n.locale" @input="onLocaleSwitch" />
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="Navigation">
        <vue-sidebar-group-item to="/">
          <vue-icon-code />
          Home
        </vue-sidebar-group-item>
        <vue-sidebar-group-item v-if="loggedIn" to="/dashboard">
          <vue-icon-code />
          Dashboard
        </vue-sidebar-group-item>
        <vue-sidebar-group-item to="/egroweed">
          <vue-icon-code />
          E-groweed
        </vue-sidebar-group-item>
        <vue-sidebar-group-item to="">
          <a href="https://blog.bancannabis.org" target="_blank" rel="noopener noreferrer"> <vue-icon-code /> Blog </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="Documentation">
        <vue-sidebar-group-item>
          <a
            :href="'docs/white_paper_bancannabis_' + $i18n.locale + '.pdf'"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <vue-icon-puzzle-piece />
            White Paper
          </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="Community">
        <vue-sidebar-group-item>
          <a href="https://github.com/bancannabis" target="_blank" rel="noopener noreferrer">
            <vue-icon-github />
            Github
          </a>
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <a href="https://twitter.com/bancannabis" target="_blank" rel="noopener noreferrer">
            <vue-icon-twitter-square />
            Twitter
          </a>
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <a href="https://discord.gg/Sm4CmV6C2K" target="_blank" rel="noopener noreferrer">
            <vue-icon-discord />
            Discord
          </a>
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <a href="https://t.me/joinchat/ClwLJ0nDi3s4MTkx" target="_blank" rel="noopener noreferrer">
            <vue-icon-mobile />
            Telegram
          </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group>
        <vue-sidebar-group-item :class="$style.theme">
          &nbsp; <vue-toggle id="toggle" v-model="checked" name="toggle" @click="onThemeChange" /> 🌗
        </vue-sidebar-group-item>
      </vue-sidebar-group>
    </vue-sidebar>

    <vue-modal :show="showLoginModal" @close="showLoginModal = false">
      <vue-tab-group>
        <vue-tab-item :title="$t('auth.LoginForm.title')" :is-active="true">
          <login-form :loading="loginRequestStatus === 'PENDING'" @submit="onLoginSubmit" />
        </vue-tab-item>
        <vue-tab-item v-if="registerRequestStatus != 'SUCCEED'" :title="$t('auth.RegisterForm.title')">
          <register-form :loading="registerRequestStatus === 'PENDING'" @submit="onRegisterSubmit" />
        </vue-tab-item>
        <vue-tab-item v-if="registerRequestStatus === 'SUCCEED'" :title="$t('auth.RegisterForm.title')">
          <h2>{{ $t('auth.RegisterForm.success') }}</h2>
          <br />
          <p>{{ $t('auth.RegisterForm.p1') }}</p>
        </vue-tab-item>
      </vue-tab-group>
    </vue-modal>
  </div>
</template>

<script lang="ts">
import '@/assets/global.scss';
import { defineComponent, computed, ref, useContext, useMeta, watch } from '@nuxtjs/composition-api';
import { RequestStatus } from '@/enums/RequestStatus';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
import VueNavBar from '@/components/organisms/VueNavBar/VueNavBar.vue';
import VueTabGroup from '@/components/organisms/VueTabGroup/VueTabGroup.vue';
import VueTabItem from '@/components/organisms/VueTabGroup/VueTabItem/VueTabItem.vue';
import VueFooterSuscribe from '@/components/organisms/VueFooterSuscribe/VueFooterSuscribe.vue';
import VueNotificationStack from '@/components/molecules/VueNotificationStack/VueNotificationStack.vue';
import VueSidebar from '@/components/organisms/VueSidebar/VueSidebar.vue';
import VueSidebarGroup from '@/components/organisms/VueSidebar/VueSidebarGroup/VueSidebarGroup.vue';
import VueSidebarGroupItem from '@/components/organisms/VueSidebar/VueSidebarGroupItem/VueSidebarGroupItem.vue';
import VueIconCode from '@/components/atoms/icons/VueIconCode/VueIconCode.vue';
import VueIconTwitterSquare from '@/components/atoms/icons/VueIconTwitterSquare/VueIconTwitterSquare.vue';
import VueIconGithub from '@/components/atoms/icons/VueIconGithub/VueIconGithub.vue';
import VueIconDiscord from '@/components/atoms/icons/VueIconDiscord/VueIconDiscord.vue';
import VueIconMobile from '@/components/atoms/icons/VueIconMobile/VueIconMobile.vue';
import VueSelect from '@/components/atoms/VueSelect/VueSelect.vue';
import VueIconPuzzlePiece from '@/components/atoms/icons/VueIconPuzzlePiece/VueIconPuzzlePiece.vue';
import VueButton from '@/components/atoms/VueButton/VueButton.vue';
import VueToggle from '@/components/atoms/VueToggle/VueToggle.vue';
import VueModal from '@/components/molecules/VueModal/VueModal.vue';
import LoginForm from '@/components/organisms/LoginForm/LoginForm.vue';
import RegisterForm from '@/components/organisms/RegisterForm/RegisterForm.vue';
import { useLocaleSwitch } from '@/composables/use-locale-switch';

export default defineComponent({
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
    VueModal,
    VueButton,
    VueToggle,
    VueIconPuzzlePiece,
    VueSelect,
    VueIconGithub,
    VueIconDiscord,
    VueIconMobile,
    VueIconCode,
    VueIconTwitterSquare,
    VueSidebarGroupItem,
    VueSidebarGroup,
    VueSidebar,
    VueNavBar,
    VueFooterSuscribe,
    VueNotificationStack,
    VueTabGroup,
    VueTabItem,
  },
  setup() {
    const { store, redirect, app } = useContext();
    const { htmlAttrs } = useMeta();
    const { switchLocaleTo } = useLocaleSwitch(app.i18n);
    const languages = computed(() => [
      { label: 'English', value: 'en' },
      { label: 'Español', value: 'es' },
      /* { label: 'Deutsch', value: 'de' },
      { label: 'Português', value: 'pt' },
      { label: '中文', value: 'zh-cn' }, */
    ]);
    const themes = computed(() => [
      { label: 'Light Theme', value: 'light' },
      { label: 'Dark Theme', value: 'dark' },
    ]);
    const showLoginModal = ref(false);
    const showVideoModal = ref(false);
    const loginRequestStatus = ref(RequestStatus.INIT);
    const registerRequestStatus = ref(RequestStatus.INIT);
    const locale = computed(() => store.getters['app/locale']);
    const theme = computed(() => store.getters['app/theme']);
    const footer = computed(() => store.getters['app/footer']);
    const loggedIn = computed(() => app.$auth.loggedIn);
    const user = computed(() => app.$auth.user);
    const onLocaleSwitch = (selectedLocale: string) => {
      switchLocaleTo(selectedLocale);
    };
    const onThemeChange = async (selectedTheme: any) => {
      if (selectedTheme === false) {
        selectedTheme = 'dark';
      } else {
        selectedTheme = 'light';
      }
      await store.dispatch('app/changeTheme', selectedTheme);
      document.documentElement.className = selectedTheme;
    };
    const onLoginSubmit = async (formData: any) => {
      loginRequestStatus.value = RequestStatus.PENDING;
      try {
        registerRequestStatus.value = RequestStatus.IDLE;
        const response = await app.$auth.loginWith('local', { data: formData });
        console.log(response);
        if (typeof response === 'object') {
          addNotification({ title: 'Secussess!', text: 'Successfully Loged' });
          redirect('/dashboard');
        }
        showLoginModal.value = false;
      } catch (e) {
        loginRequestStatus.value = RequestStatus.FAILED;
        addNotification({ title: 'Error during login!', text: 'Confirm your e-mail and try again.' });
      }
    };
    const onRegisterSubmit = async (formData: any, $strapi: any) => {
      registerRequestStatus.value = RequestStatus.PENDING;
      try {
        const response = await $strapi.register(formData.email.split('@')[0], formData.email, formData.password); // username, email, password
        registerRequestStatus.value = RequestStatus.IDLE;
        console.log(response);
        console.log(response.status);
        if (response.status === '200') {
          addNotification({ title: 'Secussess!', text: 'Successfully Registered' });
          registerRequestStatus.value = RequestStatus.SUCCEED;
        }
      } catch (e) {
        registerRequestStatus.value = RequestStatus.FAILED;
        addNotification({
          title: 'Error during register!',
          text: 'Email already registered or something went wrong, Please try again!',
        });
      }
    };
    const onLogoutClick = async () => {
      await app.$auth.logout();
      redirect('/');
      loginRequestStatus.value = RequestStatus.INIT;
      registerRequestStatus.value = RequestStatus.INIT;
    };
    watch(
      [theme, footer, locale],
      () => {
        htmlAttrs.value = {
          class: theme.value,
          lang: locale.value.substr(0, 2),
        };
      },
      { immediate: true },
    );
    return {
      languages,
      themes,
      showLoginModal,
      showVideoModal,
      loginRequestStatus,
      registerRequestStatus,
      locale,
      theme,
      footer,
      loggedIn,
      user,
      onLocaleSwitch,
      onThemeChange,
      onLoginSubmit,
      onRegisterSubmit,
      onLogoutClick,
    };
  },
  data() {
    return {
      registered: false,
      checked: false,
    };
  },
  head: {},
  methods: {
    redirectToSale() {
      window.open('https://e-groweed.com/grower/', '_blank');
    },
    redirectToBlog() {
      window.open('https://blog.bancannabis.org', '_blank');
    },
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';
@import '~@/assets/reset';
@import '~@/assets/typo';
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.theme {
  top: 2vh;
  position: relative;
}

.content {
  flex: 1;
}

.button {
  color: #520978 !important;
  background-image: url('~@/static/images/banca.png');
  background-repeat: repeat;
  &:hover {
    background: #9182dd !important;
    color: #efe58a !important;
    border-color: #520978 !important;
  }
}
.logo {
  position: relative;
  top: $space-4;
  width: $space-24;
  height: $space-24;
  color: $nav-bar-color;
}
</style>

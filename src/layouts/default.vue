<template>
  <div id="app" :class="$style.app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <vue-notification-stack />

    <vue-nav-bar>
      <vue-dropdown-menu-nav
        v-if="loggedIn"
        slot="right"
        :class="$style.dropdown"
        :items="[
          { label: 'Profile', value: 'profile' },
          { label: '', value: 'separator' },
          { label: 'Logout', value: 'logout' },
        ]"
        @item-click="itemClicked"
      >
        <vue-image id="profile_imagen_nav" :src="avatar.url" :native="true" :class="$style.profile_img" />
      </vue-dropdown-menu-nav>
      <vue-button v-if="!loggedIn && !weAreOffline" slot="right" color="primary" @click="showLoginModal = true">
        {{ $t('auth.LoginForm.title') }}
      </vue-button>
    </vue-nav-bar>

    <nuxt :class="$style.content" />

    <!--<vue-footer-Suscribe v-if="!loggedIn" />
    <vue-footer v-if="loggedIn" />-->

    <vue-sidebar>
      <vue-sidebar-group :title="$t('App.core.sidebar-t1')">
        <vue-sidebar-group-item>
          <vue-select id="lang" name="lang" :items="languages" :value="$i18n.locale" @input="onLocaleSwitch" />
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group :title="$t('App.core.sidebar-t2')">
        <vue-sidebar-group-item to="/">
          <vue-icon-code />
          Bancannabis
        </vue-sidebar-group-item>
        <vue-sidebar-group-item to="/egroweed">
          <vue-icon-code />
          E-groweed
        </vue-sidebar-group-item>
        <vue-sidebar-group-item to="/Cannaverse">
          <vue-icon-code />
          Cannaverse (Metaverse of Cannabis)
        </vue-sidebar-group-item>
        <vue-sidebar-group-item to="/bcatoken">
          <vue-icon-code />
          Get BCA token
        </vue-sidebar-group-item>
        <vue-sidebar-group-item to="/dashboardBlog">
          <vue-icon-code />
          Blog
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group v-if="loggedIn" :title="$t('App.core.sidebar-t3')">
        <vue-sidebar-group-item to="/dashboard">
          <vue-icon-code />
          Dashboard
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group :title="$t('App.core.sidebar-t4')">
        <vue-sidebar-group-item>
          <a
            v-if="loggedIn"
            :href="'docs/manifest_bancannabis_' + $i18n.locale + '.pdf'"
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-label="bancannabis manifest"
          >
            <vue-icon-puzzle-piece />
            {{ $t('App.core.sidebar-p1') }}
          </a>
          <a
            v-if="!loggedIn"
            rel="noopener noreferrer"
            aria-label="bancannabis manifest"
            @click="showLoginModal = true"
          >
            <vue-icon-puzzle-piece />
            {{ $t('App.core.sidebar-p1') }}
          </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group :title="$t('App.core.sidebar-t5')">
        <vue-sidebar-group-item>
          <a
            href="https://github.com/bancannabis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="bancannabis github"
          >
            <vue-icon-github />
            Github
          </a>
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <a
            href="https://twitter.com/bancannabis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="bancannabis twitter"
          >
            <vue-icon-twitter-square />
            Twitter
          </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group v-if="!loggedIn" :title="$t('App.core.sidebar-t6')">
        <vue-sidebar-group-item>
          <a target="_blank" rel="noopener noreferrer" aria-label="bancannabis discord" @click="showLoginModal = true">
            <vue-icon-discord />
            Discord
          </a>
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <a target="_blank" rel="noopener noreferrer" aria-label="bancannabis telegram" @click="showLoginModal = true">
            <vue-icon-mobile />
            Telegram
          </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group v-if="loggedIn" :title="$t('App.core.sidebar-t6')">
        <vue-sidebar-group-item>
          <a
            href="https://discord.gg/Sm4CmV6C2K"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="bancannabis discord"
          >
            <vue-icon-discord />
            Discord
          </a>
        </vue-sidebar-group-item>

        <vue-sidebar-group-item>
          <a
            href="https://t.me/joinchat/ClwLJ0nDi3s4MTkx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="bancannabis telegram"
          >
            <vue-icon-mobile />
            Telegram
          </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group>
        <vue-sidebar-group-item>
          <vue-toggle-theme id="toggleTheme" v-model="checked" name="toggle" @change="onThemeChange" />
        </vue-sidebar-group-item>
      </vue-sidebar-group>
    </vue-sidebar>

    <vue-modal :show="showLoginModal" @close="showLoginModal = false">
      <vue-tab-group v-if="!code" :class="$style.tab">
        <br /><br />
        <vue-tab-item :title="$t('auth.LoginForm.title')" :is-active="true">
          <login-form :loading="loginRequestStatus === 'PENDING'" @submit="onLoginSubmit" />
        </vue-tab-item>
        <vue-tab-item v-if="registerRequestStatus != 'SUCCEED'" :title="$t('auth.RegisterForm.title')">
          <register-form :loading="registerRequestStatus === 'PENDING'" @submit="onRegisterSubmit" />
        </vue-tab-item>
        <vue-tab-item
          v-if="registerRequestStatus === 'SUCCEED'"
          :title="$t('auth.RegisterForm.title')"
          :class="$style.tab_succeed"
        >
          <vue-mail-icon style="margin-left:3.2rem;" />
          <br />
          <h2>{{ $t('auth.RegisterForm.success') }}</h2>
          <br />
          {{ mailRegistered }}
          <p>{{ $t('auth.RegisterForm.p1') }}</p>
          <br />
          <a rel="noopener noreferrer" aria-label="register again" @click="registerRequestStatus = 'INIT'">
            register again
          </a>
        </vue-tab-item>
      </vue-tab-group>

      <vue-tab-group v-if="code">
        <br /><br />
        <vue-tab-item v-if="resetRequestStatus != 'SUCCEED'" title="Reset Password">
          <h2>Please enter your new password</h2>
          <reset-form :loading="resetRequestStatus === 'PENDING'" @submit="onResetSubmit" />
        </vue-tab-item>
      </vue-tab-group>
    </vue-modal>
    <vue-back-to-top />
  </div>
</template>

<script lang="ts">
import '@/assets/global.scss';
import { defineComponent, computed, ref, useContext, useMeta, watch } from '@nuxtjs/composition-api';
import $axios from 'axios';
import { RequestStatus } from '@/enums/RequestStatus';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
import VueNavBar from '@/components/organisms/VueNavBar/VueNavBar.vue';
import VueTabGroup from '@/components/organisms/VueTabGroup/VueTabGroup.vue';
import VueTabItem from '@/components/organisms/VueTabGroup/VueTabItem/VueTabItem.vue';
// import VueFooter from '@/components/organisms/VueFooter/VueFooter.vue';
// import VueFooterSuscribe from '@/components/organisms/VueFooterSuscribe/VueFooterSuscribe.vue';
import VueNotificationStack from '@/components/molecules/VueNotificationStack/VueNotificationStack.vue';
import VueDropdownMenuNav from '@/components/molecules/VueDropdownMenuNav/VueDropdownMenuNav.vue';
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
import VueToggleTheme from '@/components/atoms/VueToggleTheme/VueToggleTheme.vue';
import VueModal from '@/components/molecules/VueModal/VueModal.vue';
import LoginForm from '@/components/organisms/LoginForm/LoginForm.vue';
import RegisterForm from '@/components/organisms/RegisterForm/RegisterForm.vue';
import ResetForm from '@/components/organisms/ResetForm/ResetForm.vue';
import VueImage from '@/components/atoms/VueImage/VueImage.vue';
import { useLocaleSwitch } from '@/composables/use-locale-switch';
import VueBackToTop from '@/components/molecules/VueBackToTop/VueBackToTop.vue';
import VueMailIcon from '@/components/atoms/icons/VueMailIcon/VueMailIcon.vue';
// import VueMenu from '@/components/molecules/VueMenu/VueMenu.vue';
// import VueAvatar from '@/components/molecules/VueAvatar/VueAvatar.vue';

export default defineComponent({
  name: 'App',
  components: {
    VueBackToTop,
    LoginForm,
    RegisterForm,
    ResetForm,
    VueModal,
    VueButton,
    VueToggleTheme,
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
    // VueFooter,
    // VueFooterSuscribe,
    VueNotificationStack,
    VueTabGroup,
    VueTabItem,
    VueMailIcon,
    VueDropdownMenuNav,
    VueImage,
  },
  setup() {
    const { redirect, app, store } = useContext();
    const { htmlAttrs } = useMeta();
    const { switchLocaleTo } = useLocaleSwitch(app.i18n);
    const strapiURL = process.env.strapiURL;
    const languages = computed(() => [
      { label: 'English', value: 'en' },
      { label: 'Español', value: 'es' },
    ]);
    const themes = computed(() => [
      { label: 'System', value: 'system' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]);
    const showLoginModal = ref(false);
    const showVideoModal = ref(false);
    const code = ref(false);
    const loginRequestStatus = ref(RequestStatus.INIT);
    const locale = computed(() => app.i18n.locale);
    const registerRequestStatus = ref(RequestStatus.INIT);
    const resetRequestStatus = ref(RequestStatus.INIT);
    const theme = computed(() => store.getters['app/theme']);
    const footer = computed(() => store.getters['app/footer']);
    const loggedIn = computed(() => app.$auth.loggedIn);
    const user = computed(() => app.$auth.user);
    const avatarDefault = {
      url: 'https://res.cloudinary.com/bancannabis-dev/image/upload/v1623018818/default_66c7cc06da.png',
    };
    const avatar = computed(() => app.$auth.user.avatar || avatarDefault);
    const onLocaleSwitch = (selectedLocale: string) => {
      switchLocaleTo(selectedLocale);
    };
    const onThemeChange = async (selectedTheme: any) => {
      if (theme.value === 'light') {
        selectedTheme = 'dark';
      }
      if (theme.value === 'dark') {
        selectedTheme = 'light';
      }
      if (document.documentElement.className === 'light no-touch') {
        selectedTheme = 'dark';
      }
      await store.dispatch('app/changeTheme', selectedTheme);
      document.documentElement.className = selectedTheme;
    };
    const onResetSubmit = async (formData: any, $strapi: any): Promise<any> => {
      resetRequestStatus.value = RequestStatus.PENDING;
      try {
        resetRequestStatus.value = RequestStatus.IDLE;
        const response = await $strapi.resetPassword({
          code: formData.code,
          password: formData.password,
          passwordConfirmation: formData.password_repet,
        });
        if (response.user) {
          addNotification({ title: 'Success!', text: 'Password Reseted.', type: 'success' });
          resetRequestStatus.value = RequestStatus.SUCCEED;
          showLoginModal.value = false;
          code.value = false;
        }
      } catch (e) {
        resetRequestStatus.value = RequestStatus.FAILED;
        addNotification({
          title: 'Error!',
          text: 'Email already registered or something went wrong, Please try again!',
          type: 'error',
        });
        redirect('/');
        code.value = false;
      }
    };
    const onLoginSubmit = async (formData: any, $strapi: any): Promise<any> => {
      loginRequestStatus.value = RequestStatus.PENDING;
      if (formData.username && formData.password) {
        try {
          localStorage.clear();
          formData.identifier = formData.username.split('@')[0];
          const response: any = await app.$auth.loginWith('local', { data: formData });
          if (response) {
            redirect('/dashboard');
            loginRequestStatus.value = RequestStatus.INIT;
          }
          showLoginModal.value = false;
        } catch (e) {
          if (e.message === 'Request failed with status code 400') {
            addNotification({ title: 'Error during login!', text: 'Verify Email or Password.' });
          }
          if (e.message === RequestStatus.ERROR500) {
            addNotification({ title: 'We are Down !', text: e });
          } else {
            addNotification({ title: 'Error during login!', text: e });
          }
          loginRequestStatus.value = RequestStatus.FAILED;
        }
      }
      if (formData.username && !formData.password) {
        try {
          registerRequestStatus.value = RequestStatus.IDLE;
          const response = await $strapi.forgotPassword({ email: formData.username });
          if (response) {
            addNotification({ title: 'Success!', text: 'Mail sended.', type: 'success' });
          }
          showLoginModal.value = false;
        } catch (e) {
          loginRequestStatus.value = RequestStatus.FAILED;
          addNotification({ title: 'Error during send mail!', text: e });
        }
      }
      if (formData.google) {
        try {
          localStorage.clear();
        } catch (e) {
          if (e.message === 'Request failed with status code 400') {
            addNotification({ title: 'Error during login!', text: 'Verify Email or Password.' });
          }
          if (e.message === RequestStatus.ERROR500) {
            addNotification({ title: 'We are Down !', text: 'Please try again later.' });
          } else {
            addNotification({ title: 'Error during login!', text: e });
          }
          loginRequestStatus.value = RequestStatus.FAILED;
        } finally {
          await app.$auth.loginWith('google');
        }
      }
    };
    const onLogoutClick = async () => {
      await app.$auth.logout().then(() => {
        localStorage.clear();
        redirect('/');
        window.history.replaceState({}, document.title, '/');
        loginRequestStatus.value = RequestStatus.INIT;
        registerRequestStatus.value = RequestStatus.INIT;
      });
    };
    const redirectTo = (to: string) => {
      redirect(to);
    };
    watch(
      [theme, footer, locale],
      () => {
        htmlAttrs.value = {
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
      code,
      loginRequestStatus,
      registerRequestStatus,
      resetRequestStatus,
      locale,
      theme,
      footer,
      loggedIn,
      user,
      onLocaleSwitch,
      onResetSubmit,
      onLogoutClick,
      redirectTo,
      onThemeChange,
      onLoginSubmit,
      strapiURL,
      avatar,
      redirect,
    };
  },
  data() {
    return {
      registered: false,
      checked: false,
      mailRegistered: '',
      weAreOffline: false,
      access_token: this.$route.query.access_token,
    };
  },
  head: {},
  async mounted() {
    const check = document.querySelector('#check');
    const box = document.querySelector('.box');
    const ball = document.querySelector('.ball');

    check.addEventListener('change', function() {
      if (this.checked === true) {
        box.setAttribute('style', 'background-color:black;');
        ball.setAttribute('style', 'transform:translatex(100%);');
      }
      if (this.checked === false) {
        box.setAttribute('style', 'background-color:black; color:white;');
        ball.setAttribute('style', 'transform:translatex(0%);');
      }
    });
    // if reset code get in url
    if (this.$route.query.code) {
      this.code = this.$route.query.code;
      this.showLoginModal = true;
    }
    // google auth
    if (this.$route.query.access_token) {
      const res = await this.$axios.$get(
        process.env.strapiURL + `/auth/google/callback?access_token=${this.access_token}`,
      );
      const { jwt, user } = res;
      this.$auth.setUserToken(jwt);
      this.$auth.setUser(user);
      this.$router.push(`/dashboard`);
    }
  },
  methods: {
    itemClicked(e: any) {
      if (e.value === 'logout') {
        this.onLogoutClick();
      }
      if (e.value === 'login') {
        this.showLoginModal = true;
      }
      if (e.value === 'profile') {
        this.redirectTo('/profile');
      }
    },
    async onRegisterSubmit(formData: any) {
      this.registerRequestStatus = RequestStatus.PENDING;
      try {
        const response = await $axios.post(process.env.strapiURL + '/auth/local/register', {
          username: formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
        });
        this.registerRequestStatus = RequestStatus.IDLE;
        const userDetails = {
          email: formData.email,
          password: formData.password,
          referral: '',
          metamask: false,
        };
        // registrar usuario en egroweed
        await $axios.post('https://e-groweed.com:3800/api/v1' + '/user', userDetails);
        if (response) {
          addNotification({ title: 'Success!', text: 'Registered.', type: 'success' });
          // $axios.get(process.env.strapiURL + '/send-mail?email=' + formData.email);
          // send internarnal mail to bancannabis.co 'this will be internal in strapi -fix
          this.registerRequestStatus = RequestStatus.SUCCEED;
          this.mailRegistered = formData.email;
        }
      } catch (e) {
        this.registerRequestStatus = RequestStatus.FAILED;
        addNotification({
          title: 'Error during register!',
          text: 'Email already registered or something went wrong, Please try again!',
        });
      }
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
  padding-top: $nav-bar-height;
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

.profile_img {
  height: auto;
  width: 45px;
  border-radius: 50%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 10px auto;
  border: none !important;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  &:hover {
    opacity: 100 !important;
    background: none !important;
    color: none !important;
    border-color: none !important;
  }
}

.dropdown {
  > span {
    &:hover {
      background: transparent !important;
      border-radius: 50%;
    }
  }
}

.tab_succeed {
  margin: auto;
  width: 60%;
  text-align: center;
  align-items: center;
}

.tab {
  background-color: var(--brand-primary-color);
}
</style>

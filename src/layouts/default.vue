<template>
  <div id="app" :class="$style.app">
    <vue-notification-stack />

    <vue-nav-bar>
      <template v-if="user" slot="middle"> </template>
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
      <vue-button v-if="!loggedIn" slot="right" color="primary" @click="showLoginModal = true">
        {{ $t('auth.LoginForm.title') }}
      </vue-button>
    </vue-nav-bar>

    <nuxt :class="$style.content" />

    <vue-footer-Suscribe v-if="!loggedIn" />
    <vue-footer v-if="loggedIn" />

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
          <a
            @click="showLoginModal = true"
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
            @click="showLoginModal = true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="bancannabis telegram"
          >
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
        <vue-sidebar-group-item :class="$style.theme">
          &nbsp; <vue-toggle id="toggle" v-model="checked" name="toggle" @click="onThemeChange" />
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
import { RequestStatus } from '@/enums/RequestStatus';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
import VueNavBar from '@/components/organisms/VueNavBar/VueNavBar.vue';
import VueTabGroup from '@/components/organisms/VueTabGroup/VueTabGroup.vue';
import VueTabItem from '@/components/organisms/VueTabGroup/VueTabItem/VueTabItem.vue';
import VueFooter from '@/components/organisms/VueFooter/VueFooter.vue';
import VueFooterSuscribe from '@/components/organisms/VueFooterSuscribe/VueFooterSuscribe.vue';
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
import VueToggle from '@/components/atoms/VueToggle/VueToggle.vue';
import VueModal from '@/components/molecules/VueModal/VueModal.vue';
import LoginForm from '@/components/organisms/LoginForm/LoginForm.vue';
import RegisterForm from '@/components/organisms/RegisterForm/RegisterForm.vue';
import ResetForm from '@/components/organisms/ResetForm/ResetForm.vue';
import VueImage from '@/components/atoms/VueImage/VueImage.vue';
import { useLocaleSwitch } from '@/composables/use-locale-switch';
import VueBackToTop from '@/components/molecules/VueBackToTop/VueBackToTop.vue';
import VueMailIcon from '@/components/atoms/icons/VueMailIcon/VueMailIcon.vue';
import $axios from 'axios';

// import { HTTPResponse } from '@nuxtjs/auth-next';

export default defineComponent({
  name: 'App',
  components: {
    VueBackToTop,
    LoginForm,
    RegisterForm,
    ResetForm,
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
    VueFooter,
    VueFooterSuscribe,
    VueNotificationStack,
    VueDropdownMenuNav,
    VueTabGroup,
    VueTabItem,
    VueImage,
    VueMailIcon,
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
      if (selectedTheme === false || theme.value === 'light') {
        selectedTheme = 'dark';
      } else {
        selectedTheme = 'light';
      }
      await store.dispatch('app/changeTheme', selectedTheme);
      document.documentElement.className = selectedTheme;
    };
    const onLoginSubmit = async (formData: any, $strapi: any): Promise<any> => {
      loginRequestStatus.value = RequestStatus.PENDING;
      if (formData.username && formData.password) {
        try {
          registerRequestStatus.value = RequestStatus.IDLE;
          const response: any = await app.$auth.loginWith('local', { data: formData });
          // console.log(response);
          if (response) {
            // addNotification({ title: 'Success!', text: 'Logedin.', type: 'success' });
            redirect('/dashboard');
          }
          showLoginModal.value = false;
        } catch (e) {
          if (e.status === 400) {
            addNotification({ title: 'Error during login!', text: e });
          } else {
            addNotification({ title: 'Error during login!', text: e });
          }
          loginRequestStatus.value = RequestStatus.FAILED;
        }
      } else {
        // forgot password
        try {
          registerRequestStatus.value = RequestStatus.IDLE;
          const response = await $strapi.forgotPassword(formData.username);
          if (response) {
            addNotification({ title: 'Success!', text: 'Mail sended.', type: 'success' });
          }
          showLoginModal.value = false;
        } catch (e) {
          loginRequestStatus.value = RequestStatus.FAILED;
          addNotification({ title: 'Error during send mail!', text: e });
        }
      }
    };
    const onResetSubmit = async (formData: any, $strapi: any) => {
      resetRequestStatus.value = RequestStatus.PENDING;
      try {
        const response = await $strapi.resetPassword(formData.code, formData.password, formData.password_repet);
        resetRequestStatus.value = RequestStatus.IDLE;
        if (response.status === '200') {
          addNotification({ title: 'Success!', text: 'Password Reseted.', type: 'success' });
          resetRequestStatus.value = RequestStatus.SUCCEED;
          redirect('/');
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
    const onLogoutClick = async () => {
      await app.$auth.logout().then((res) => {
        redirect('/');
        window.history.replaceState({}, document.title, '/');
        loginRequestStatus.value = RequestStatus.INIT;
        registerRequestStatus.value = RequestStatus.INIT;
      });
    };
    const redirectToProfile = () => {
      redirect('/profile');
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
      locale,
      theme,
      footer,
      loggedIn,
      user,
      onLocaleSwitch,
      onLoginSubmit,
      onResetSubmit,
      onLogoutClick,
      redirectToProfile,
      onThemeChange,
      strapiURL,
      avatar,
    };
  },
  data() {
    return {
      registered: false,
      checked: false,
      mailRegistered: '',
    };
  },
  head: {},
  mounted() {
    if (this.$route.query.code) {
      this.code = this.$route.query.code;
      this.showLoginModal = true;
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
        this.redirectToProfile();
      }
    },
    redirectToSale() {
      window.open('https://e-groweed.com/grower/', '_blank');
    },
    redirectToBlog() {
      window.open('https://blog.bancannabis.org', '_blank');
    },
    onRegisterSubmit(formData: any) {
      this.registerRequestStatus = RequestStatus.PENDING;
      try {
        const response = $axios.post(process.env.strapiURL + '/auth/local/register', {
          username: formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
        });
        this.registerRequestStatus = RequestStatus.IDLE;
        if (response) {
          // console.log(response);
          addNotification({ title: 'Success!', text: 'Registered.', type: 'success' });
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
  //border: 3px solid black !important;
  border: none !important;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
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
</style>

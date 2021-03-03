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

      <vue-button v-if="loggedIn" slot="right" color="primary" @click="onLogoutClick"> Logout </vue-button>
    </vue-nav-bar>

    <nuxt :class="$style.content" />

    <vue-footer />

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
        <vue-sidebar-group-item to="">
           <a href="https://blog.bancannabis.org" rel="noopener noreferrer">
             <vue-icon-code /> Blog
          </a>
        </vue-sidebar-group-item>
      </vue-sidebar-group>

      <vue-sidebar-group title="Documentation">
        <vue-sidebar-group-item>
          <a href="docs/white_paper_bancannabis_esp.pdf" target="_blank" rel="noopener noreferrer" download>
            <vue-icon-puzzle-piece />
            White Paper Bancannabis Español
          </a>
        </vue-sidebar-group-item>
        <vue-sidebar-group-item>
          <a href="docs/white_paper_bancannabis_eng.pdf" target="_blank" rel="noopener noreferrer" download>
            <vue-icon-puzzle-piece />
            White Paper Bancannabis English
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
          &nbsp; <vue-toggle name="toggle" id="toggle" v-model="checked" @click="onThemeChange" /> 🌗
        </vue-sidebar-group-item>
      </vue-sidebar-group>
    </vue-sidebar>

    <vue-modal :show="showLoginModal" @close="showLoginModal = false">
      <login-form :loading="loginRequestStatus === 'PENDING'" @submit="onLoginSubmit" />
    </vue-modal>
  </div>
</template>

<script lang="ts">
import '@/assets/global.scss';
import { defineComponent, computed, ref, useContext, useMeta, watch } from '@nuxtjs/composition-api';
import { RequestStatus } from '@/enums/RequestStatus';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
import VueNavBar from '@/components/organisms/VueNavBar/VueNavBar.vue';
import VueFooter from '@/components/organisms/VueFooter/VueFooter.vue';
import VueNotificationStack from '@/components/molecules/VueNotificationStack/VueNotificationStack.vue';
import VueSidebar from '@/components/organisms/VueSidebar/VueSidebar.vue';
import VueSidebarGroup from '@/components/organisms/VueSidebar/VueSidebarGroup/VueSidebarGroup.vue';
import VueSidebarGroupItem from '@/components/organisms/VueSidebar/VueSidebarGroupItem/VueSidebarGroupItem.vue';
import VueIconCode from '@/components/atoms/icons/VueIconCode/VueIconCode.vue';
import VueIconBook from '@/components/atoms/icons/VueIconBook/VueIconBook.vue';
import VueIconHashtag from '@/components/atoms/icons/VueIconHashtag/VueIconHashtag.vue';
import VueIconGithub from '@/components/atoms/icons/VueIconGithub/VueIconGithub.vue';
import VueIconDiscord from '@/components/atoms/icons/VueIconDiscord/VueIconDiscord.vue';
import VueIconMobile from '@/components/atoms/icons/VueIconMobile/VueIconMobile.vue';
import VueIconTwitterSquare from '@/components/atoms/icons/VueIconTwitterSquare/VueIconTwitterSquare.vue';
import VueSelect from '@/components/atoms/VueSelect/VueSelect.vue';
import VueIconPuzzlePiece from '@/components/atoms/icons/VueIconPuzzlePiece/VueIconPuzzlePiece.vue';
import VueButton from '@/components/atoms/VueButton/VueButton.vue';
import VueToggle from '@/components/atoms/VueToggle/VueToggle.vue';
import VueModal from '@/components/molecules/VueModal/VueModal.vue';
import LoginForm from '@/components/organisms/LoginForm/LoginForm.vue';
import { useLocaleSwitch } from '@/composables/use-locale-switch';

export default defineComponent({
  name: 'App',
  components: {
    LoginForm,
    VueModal,
    VueButton,
    VueToggle,
    VueIconPuzzlePiece,
    VueSelect,
    VueIconTwitterSquare,
    VueIconGithub,
    VueIconHashtag,
    VueIconDiscord,
    VueIconMobile,
    VueIconBook,
    VueIconCode,
    VueSidebarGroupItem,
    VueSidebarGroup,
    VueSidebar,
    VueNavBar,
    VueFooter,
    VueNotificationStack,
  },
  data() {
    return { checked: false };
  },
  methods: {
    redirectToSale() {
      window.open('https://e-groweed.com/grower/', '_blank');
    },
    redirectToBlog() {
      window.open('https://blog.bancannabis.org', '_blank');
    },
  },
  setup() {
    const { store, redirect, app } = useContext();
    const { htmlAttrs } = useMeta();
    const { switchLocaleTo } = useLocaleSwitch(app.i18n);
    const languages = computed(() => [
      { label: 'English', value: 'en' },
      { label: 'Español', value: 'es' },
      /*       { label: 'Deutsch', value: 'de' },
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
    const locale = computed(() => store.getters['app/locale']);
    const theme = computed(() => store.getters['app/theme']);
    const loggedIn = computed(() => app.$auth.loggedIn);
    const user = computed(() => app.$auth.user);
    const onLocaleSwitch = (selectedLocale: string) => {
      switchLocaleTo(selectedLocale);
    };
    const onThemeChange = async (selectedTheme: any) => {
      if (selectedTheme == false) {
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
        await app.$auth.loginWith('local', { data: formData });
        redirect('/example/dashboard');
        loginRequestStatus.value = RequestStatus.IDLE;
      } catch (e) {
        loginRequestStatus.value = RequestStatus.FAILED;
        addNotification({ title: 'Error during login', text: 'Please try again!' });
      }

      showLoginModal.value = false;
    };
    const onLogoutClick = async () => {
      await app.$auth.logout();
      redirect('/');
    };
    watch(
      [theme, locale],
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
      locale,
      theme,
      loggedIn,
      user,
      onLocaleSwitch,
      onThemeChange,
      onLoginSubmit,
      onLogoutClick,
    };
  },
  head: {},
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

<template>
  <div>
    <validation-observer v-slot="{ invalid }">
      <form :class="$style.loginForm" @submit.stop.prevent="onSubmit">
        <vue-grid v-if="!forget">
          <vue-grid-row vertical-space="lg">
            <vue-grid-column>
              <vue-input
                id="email"
                v-model="username"
                name="email"
                type="email"
                autofocus
                required
                :label="$t('common.email' /* Username */)"
                :placeholder="$t('common.email.placeholder')"
                validation="required"
                :error-message="$t('auth.LoginForm.username.error')"
                :autocomplete="username"
              />
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column>
              <vue-input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                :label="$t('common.password')"
                :placeholder="$t('common.password.placeholder')"
                validation="required|min:6"
                :error-message="$t('auth.LoginForm.password.error')"
                :autocomplete="password"
              />
            </vue-grid-column>
          </vue-grid-row>

          <vue-grid-row>
            <vue-grid-column justify-content="flex-end">
              <!-- <vue-checkbox id="remember" label="Remember?" name="remember" :checked="checked" @click="onCheck()" /> -->
              <a :class="$style.a" href="" target="_blank" rel="noopener noreferrer" @click.prevent="onClick()">
                {{ $t('auth.LoginForm.forgot') }}
              </a>
              &nbsp;
              <vue-button color="primary" tabindex="3" type="submit" :disabled="invalid" :loading="loading">
                {{ $t('auth.LoginForm.cta') }}
              </vue-button>
              &nbsp; or &nbsp;
              <vue-button color="primary" tabindex="3" @click.prevent="google()">
                <vue-icon-google />
              </vue-button>
            </vue-grid-column>
          </vue-grid-row>
        </vue-grid>
        <vue-grid v-if="forget">
          <vue-grid-row vertical-space="lg">
            <vue-grid-column>
              <vue-input
                id="email"
                v-model="username"
                name="email"
                type="email"
                autofocus
                required
                :label="$t('common.email' /* Username */)"
                :placeholder="$t('common.email.placeholder' /* Enter any username */)"
                validation="required"
                :error-message="$t('auth.LoginForm.username.error' /* The username can not be empty */)"
                :autocomplete="username"
              />
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column justify-content="flex-end">
              <vue-button color="primary" tabindex="3" type="submit" :disabled="invalid" :loading="loading">
                {{ $t('auth.LoginForm.ctaSend') }}
              </vue-button>
            </vue-grid-column>
          </vue-grid-row>
        </vue-grid>
      </form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { ValidationObserver } from 'vee-validate';
// import VueText from '@/components/atoms/VueText/VueText.vue';
import VueInput from '@/components/atoms/VueInput/VueInput.vue';
// import VueCheckbox from '@/components/atoms/VueCheckbox/VueCheckbox.vue';
import VueButton from '@/components/atoms/VueButton/VueButton.vue';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueIconGoogle from '@/components/atoms/icons/VueIconGoogle/VueIconGoogle.vue';

export default {
  name: 'LoginForm',
  components: { ValidationObserver, VueGridColumn, VueGridRow, VueGrid, VueButton, VueInput, VueIconGoogle },
  props: {
    loading: { type: Boolean, default: false },
  },
  data(): any {
    return {
      username: '',
      password: '',
      checked: false,
      forget: false,
    };
  },
  computed: {},
  mounted() {
    this.username = '';
    this.password = '';
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.$data, this.$strapi);
    },
    onCheck() {
      this.checked = !this.checked;
      if (this.checked === false) {
        this.username = '';
        this.password = '';
      }
    },
    onClick() {
      this.forget = true;
      this.password = '';
    },
    google() {
      const data = { google: 'true' };
      this.$emit('submit', data, this.$strapi);
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.loginForm {
  @include mediaMin(tabletPortrait) {
    min-width: 512px;
  }
}
</style>

<template>
  <div>
    <validation-observer v-slot="{ invalid }">
      <form :class="$style.loginForm" @submit.stop.prevent="onSubmit">
        <vue-grid>
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
              />
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column>
              <vue-input
                id="password_repet"
                v-model="password_repet"
                name="password_repet"
                type="password"
                required
                :label="$t('common.repeatpassword')"
                :placeholder="$t('common.password.placeholder')"
                validation="confirmed:password"
                :error-message="$t('auth.LoginForm.password.error_confirm')"
              />
            </vue-grid-column>
          </vue-grid-row>
          <div></div>
          <vue-grid-row>
            <vue-grid-column justify-content="flex-end">
              <vue-button color="primary" tabindex="3" type="submit" :disabled="invalid" :loading="loading">
                {{ $t('auth.ResetForm.cta') }}
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
//import VueHeadline from '@/components/atoms/VueHeadline/VueHeadline.vue';
import VueInput from '@/components/atoms/VueInput/VueInput.vue';
import VueButton from '@/components/atoms/VueButton/VueButton.vue';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';

export default {
  name: 'ResetForm',
  components: { ValidationObserver, VueGridColumn, VueGridRow, VueGrid, VueButton, VueInput },
  props: {
    loading: { type: Boolean, default: false },
  },
  data(): any {
    return {
      code: this.$route.query.code,
      password: '',
      password_repet: '',
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$emit('submit', this.$data, this.$strapi, this.axios);
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

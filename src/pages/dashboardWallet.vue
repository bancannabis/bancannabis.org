<template>
  <div :class="$style.dashboard">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/dashboard' },
              { label: 'Wallet', href: '/wallet' },
            ]"
          />
        </vue-grid-column>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-column>
          <vue-card :class="$style.card_big">
            <vue-card-body :class="$style.card_big_body">
              <wallet :class="$style.wallet" />
            </vue-card-body>
          </vue-card>
        </vue-grid-column>
        <vue-grid-column>
          <vue-card :class="$style.card_big">
            <vue-card-body :class="$style.card_big_body"></vue-card-body>
          </vue-card>
        </vue-grid-column>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
/* istanbul ignore file */
import { defineComponent, ref, useContext, computed } from '@nuxtjs/composition-api';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueBreadcrumb from '@/components/molecules/VueBreadcrumb/VueBreadcrumb.vue';
import VueCard from '@/components/molecules/VueCard/VueCard.vue';
// import VueCardHeader from '@/components/molecules/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardBody from '@/components/molecules/VueCard/VueCardBody/VueCardBody.vue';
// import VueText from '@/components/atoms/VueText/VueText.vue';
import Wallet from '@/components/organisms/Wallet/Wallet.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridColumn,
    // VueCardHeader,
    VueGridRow,
    VueCard,
    VueCardBody,
    // VueText,
    Wallet,
  },
  middleware: 'auth',
  props: {
    loading: { type: Boolean, default: false },
  },
  setup() {
    const { app } = useContext();
    const pending = ref(false);
    const user = computed(() => app.$auth.user);

    return { pending, user };
  },
  head: {
    title: 'Bancannabis | Wallet',
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.dashboard {
  padding-top: $nav-bar-height;
}

.card {
  border-radius: 10px !important;
}

.card_big {
  border-radius: 10px !important;
  min-width: auto;
  min-height: 40rem;
  // background-image: url('/images/card_bg_purple.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-color: black !important;
  border: none !important;
  border: 3px solid black !important;
}
.card_big_body {
  .card_headline {
    margin-top: 7rem;
  }
}

.card_little {
  border-radius: 10px !important;
  max-width: auto;
  max-height: 40rem;
  border: 3px solid black !important;
  object-fit: contain;
}

.wallet {
  max-height: 40rem !important;
  // max-width: 40rem !important;
}

.card_row {
  padding: 2rem 2rem 1rem 4rem;
  display: block;
}

.column {
  margin-left: auto;
  margin-right: auto;
  width: 15em;
}

.ul {
  padding-top: 2rem;
  padding-left: 8rem;
  list-style-type: circle;
}
</style>

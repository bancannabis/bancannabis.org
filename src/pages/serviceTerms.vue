<template>
  <div :class="$style.dashboard">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/' },
              { label: 'Terms and conditions', href: '/terms' },
            ]"
          />
        </vue-grid-column>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-column>
          <vue-card :class="$style.card_big">
            <vue-card-body :class="$style.card_big_body">
              <br /><br />
              <br />
              <vue-text>{{ $t('App.core.dashboard.card-t1') }}</vue-text>
              <br />
              <br />
              <vue-text>{{ $t('App.core.terms') }}</vue-text>
              <br /><br />
              <br />
            </vue-card-body>
          </vue-card>
        </vue-grid-column>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
/* istanbul ignore file */
import { defineComponent } from '@nuxtjs/composition-api';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueBreadcrumb from '@/components/molecules/VueBreadcrumb/VueBreadcrumb.vue';
import VueCard from '@/components/molecules/VueCard/VueCard.vue';
import VueCardBody from '@/components/molecules/VueCard/VueCardBody/VueCardBody.vue';
import VueText from '@/components/atoms/VueText/VueText.vue';

export default defineComponent({
  name: 'ServicesTerms',
  auth: false,
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridColumn,
    VueGridRow,
    VueCard,
    VueCardBody,
    VueText,
  },
  head: {
    title: 'Bancannabis | Terms of service',
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
  // background-image: url('/images/card_bg_purple.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-color: black !important;
  border: none !important;
  // border: 3px solid black !important;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
.card_big_body {
  padding-left: 4rem;
  .card_headline {
    margin-top: 7rem;
  }
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.card_little {
  border-radius: 10px !important;
  max-width: auto;
  max-height: 40rem;
  // border: 3px solid black !important;
  border: none !important;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
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

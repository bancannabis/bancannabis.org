<template>
  <div>
    <stage />
    <home-section image="images/welcome.png" video="videos/join.mp4" flip :class="$style.HomeSection">
      <vue-grid with-vertical-space>
        <vue-grid-row>
          <vue-grid-column>
            <vue-headline level="2">{{ $t('components.home.tittle') }}</vue-headline>
          </vue-grid-column>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-column>
            <vue-headline level="3">{{ $t('components.home.headline-1') }}</vue-headline>
            <p>
              {{ $t('components.home.p-1') }}
            </p>
          </vue-grid-column>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-column>
            <vue-headline level="3">{{ $t('components.home.headline-2') }}</vue-headline>
            <p>
              {{ $t('components.home.p-2') }}
              <nuxt-link :to="{ path: localePath('/egroweed') }" :class="$style.a">
                <span>{{ $t('about.bca.p6') }}.</span>
              </nuxt-link>
            </p>
          </vue-grid-column>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-column>
            <vue-headline level="3">{{ $t('components.home.headline-3') }}</vue-headline>
            <p>
              {{ $t('components.home.p-3') }}
            </p>
          </vue-grid-column>
        </vue-grid-row>
      </vue-grid>
    </home-section>
  </div>
</template>

<script lang="ts">
/* istanbul ignore file */
// import { ref } from '@nuxtjs/composition-api';
import HomeSection from '@/components/organisms/HomeSection/HomeSection.vue';
import VueHeadline from '@/components/atoms/VueHeadline/VueHeadline.vue';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
// import VueModal from '@/components/molecules/VueModal/VueModal.vue';
import Stage from '../components/organisms/Stage/Stage.vue';

export default {
  name: 'Home',
  auth: false,
  components: {
    VueGridColumn,
    VueGridRow,
    VueGrid,
    VueHeadline,
    HomeSection,
    Stage,
    // VueModal,
  },
  head() {
    return {
      title: 'Bancannabis.org | The Open Community in Cannabis Ecosystem',
      meta: [
        {
          name: 'description',
          content: 'Bancannabis.org | The Open Community in Cannabis Ecosystem',
        },
        {
          name: 'robots',
          content: 'INDEX,FOLLOW',
        },
        {
          name: 'keywords',
          content: 'bancannabis, cannabis, blockchain, Dapp',
        },

        { name: 'og:url', content: 'https://bancannabis.org' },
        { name: 'og:site_name', content: 'bancannabis.org' },
        { name: 'og:type', content: 'website' },
        { name: 'og:locale', content: 'en' },
        {
          name: 'og:title',
          content: 'Bancannabis.org | The Open Community in Cannabis Ecosystem',
        },
        {
          name: 'og:description',
          content: 'Bancannabis.org | The Open Community in Cannabis Ecosystem',
        },
        { name: 'og:image:url', content: 'favicon.ico' },

        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@bancannabis' },
        { name: 'twitter:creator', content: '@bancannabis' },
        {
          name: 'twitter:title',
          content: 'Bancannabis.org | The Open Community in Cannabis Ecosystem',
        },
        { name: 'twitter:url', content: 'https://twitter.com/bancannabis' },
        { name: 'twitter:image', content: 'https://bancannabis.org/logo.png' },
        {
          name: 'twitter:description',
          content: 'Bancannabis.org | The Open Community in Cannabis Ecosystem',
        },
      ],
    };
  },
};
</script>
<style lang="scss" module>
@import '~@/assets/design-system';

.HomeSection {
  p{
    text-align: justify;
    text-justify: inter-word;
  }
}
.a {
  color: #9cbe34;
  font-weight: $footer-link-font-weight;

  &:hover {
    color: #291e59;
  }
}
</style>

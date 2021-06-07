<template>
  <div>
    <stage />
    <home-section image="images/welcome.png" video="videos/join.mp4" flip :class="$style.index">
      <vue-grid with-vertical-space>
        <vue-grid-row>
          <vue-grid-column>
            <vue-text appearance="h6" as="h6">
              {{ $t('components.home.tittle') }}
            </vue-text>
          </vue-grid-column>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-column>
            <vue-text appearance="h3" as="h3">{{ $t('components.home.headline-1') }}</vue-text>
            <p>
              {{ $t('components.home.p-1') }}
            </p>
          </vue-grid-column>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-column>
            <vue-text appearance="h3" as="h3">{{ $t('components.home.headline-2') }}</vue-text>
            <p>
              {{ $t('components.home.p-2') }}
              <a
                :class="$style.a"
                href="https://e-groweed.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="egroweed.com"
              >
                {{ $t('about.bca.p6') }}.
              </a>
            </p>
          </vue-grid-column>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-column>
            <vue-text appearance="h3" as="h3">{{ $t('components.home.headline-3') }}</vue-text>
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
import VueText from '@/components/atoms/VueText/VueText.vue';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import Stage from '../components/organisms/Stage/Stage.vue';

export default {
  name: 'HomePage',
  auth: false,
  components: {
    VueGridColumn,
    VueGridRow,
    VueGrid,
    VueText,
    HomeSection,
    Stage,
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

.index {
  p {
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

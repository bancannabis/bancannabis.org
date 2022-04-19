<template>
  <div id="divContent">
    <iframe src="https://e-groweed.com/dapp" style="position:absolute; top:0px" width="100%" height="100%" />
  </div>
  <!--<div :class="$style.dashboard">
    <stage-egroweed />
    <vue-grid with-vertical-space>
      <home-section
        image="images/welcome2.png"
        :video="'videos/egroweed_' + $i18n.locale + '.mp4'"
        flip
        :class="$style.index"
      >
        <vue-grid with-vertical-space>
          <vue-grid-row>
            <vue-grid-column>
              <vue-text appearance="h6">
                {{ $t('components.home-egroweed.tittle') }}
              </vue-text>
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column>
              <vue-text appearance="h3">
                {{ $t('components.home-egroweed.headline-1') }}
              </vue-text>
              <p>
                {{ $t('components.home-egroweed.p-1') }}
              </p>
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column>
              <vue-text appearance="h3">
                {{ $t('components.home-egroweed.headline-2') }}
              </vue-text>
              <p>
                {{ $t('components.home-egroweed.p-2') }}
              </p>
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column>
              <vue-text appearance="h3">
                {{ $t('components.home-egroweed.headline-3') }}
              </vue-text>
              <p>
                {{ $t('components.home-egroweed.p-3') }}
              </p>
              <a
                :class="$style.a"
                href="https://e-groweed.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="egroweed.com"
              >
                {{ $t('about.bca.p8') }}.
              </a>
            </vue-grid-column>
          </vue-grid-row>
        </vue-grid>
      </home-section>
    </vue-grid>
  </div>-->
</template>

<script lang="ts">
/* istanbul ignore file */
// import { ref } from '@nuxtjs/composition-api';
import { useContext } from '@nuxtjs/composition-api';
/*
  import StageEgroweed from '../components/organisms/StageEgroweed/StageEgroweed.vue';
  import HomeSection from '@/components/organisms/HomeSection/HomeSection.vue';
  import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
  import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
  import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
  import VueText from '@/components/atoms/VueText/VueText.vue';
*/

export default {
  name: 'Egroweed',
  auth: false,
  components: {
    /*
      StageEgroweed,
      VueGridColumn,
      VueGridRow,
      VueGrid,
      HomeSection,
      VueText,
    */
  },
  setup() {
    const { store } = useContext();
    store.dispatch('app/changeFooter', true);
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

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

/* Add some content at the bottom of the video/page */
.content {
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}

/* Style the button used to pause/play the video */
#myBtn {
  width: 200px;
  font-size: 18px;
  padding: 10px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
}

#myBtn:hover {
  background: #ddd;
  color: black;
}
</style>
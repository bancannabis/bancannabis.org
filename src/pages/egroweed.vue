<template>
  <div :class="$style.dashboard">
    <stage-egroweed />
    <vue-grid with-vertical-space>
      <home-section image="images/welcome2.png" :video="'videos/egroweed_' + $i18n.locale + '.mp4'"  flip :class="$style.HomeSection">
        <vue-grid with-vertical-space>
          <vue-grid-row>
            <vue-grid-column>
              <vue-headline level="2">{{ $t('components.home-egroweed.tittle') }}</vue-headline>
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column>
              <vue-headline level="3">{{ $t('components.home-egroweed.headline-1') }}</vue-headline>
              <p>
                {{ $t('components.home-egroweed.p-1') }}
              </p>
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column>
              <vue-headline level="3">{{ $t('components.home-egroweed.headline-2') }}</vue-headline>
              <p>
                {{ $t('components.home-egroweed.p-2') }}
              </p>
            </vue-grid-column>
          </vue-grid-row>
          <vue-grid-row>
            <vue-grid-column>
              <vue-headline level="3">{{ $t('components.home-egroweed.headline-3') }}</vue-headline>
              <p>
                {{ $t('components.home-egroweed.p-3') }}
              </p>
            </vue-grid-column>
          </vue-grid-row>
        </vue-grid>
      </home-section>
    </vue-grid>
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
import { useContext } from '@nuxtjs/composition-api';
import StageEgroweed from '../components/organisms/StageEgroweed/StageEgroweed.vue';

export default {
  name: 'Egroweed',
  auth: false,
  components: {
    StageEgroweed,
    VueGridColumn,
    VueGridRow,
    VueGrid,
    VueHeadline,
    HomeSection,
    // VueModal,
  },
  setup() {
    const { store } = useContext();
    store.dispatch('app/changeFooter', true);
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

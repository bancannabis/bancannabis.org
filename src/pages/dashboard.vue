<template>
  <div :class="$style.dashboard">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/dashboard' },
              { label: 'Dashboard', href: '/dashboard' },
            ]"
          />
        </vue-grid-column>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-column>
          <vue-card :class="$style.card_big">
            <vue-card-header
              image="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/272/waving-hand_1f44b.png"
              :title="$t('App.core.dashboard.greetings')"
              :subtitle="user.name"
            />
            <vue-card-body :class="$style.card_big_body">
              <vue-text>{{ $t('App.core.dashboard.card-t1') }}</vue-text>
              <br />
              <vue-text>
                {{ $t('App.core.dashboard.card-t2') }}
                <br />
                {{ $t('App.core.dashboard.card-t3') }}
                <br />
                {{ $t('App.core.dashboard.card-t4') }}
              </vue-text>
              <vue-text>
                <ul :class="$style.ul">
                  <li>
                    <nuxt-link :to="localePath('/dashboardWallet')">
                      <vue-icon-wallet /> {{ $t('App.core.dashboard.card-l1') }}
                    </nuxt-link>
                  </li>
                  <br />
                  <li>
                    <nuxt-link :to="localePath('/dashboardBlog')"><vue-icon-blog /> Blog</nuxt-link>
                  </li>
                  <br />
                </ul>
              </vue-text>
            </vue-card-body>
          </vue-card>
        </vue-grid-column>
        <vue-grid-column>
          <vue-card :class="$style.card_little">
            <vue-card-header title="Featured projects"> </vue-card-header>
            <vue-carousel :images="images" :interval="6000" />
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
import VueCardHeader from '@/components/molecules/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardBody from '@/components/molecules/VueCard/VueCardBody/VueCardBody.vue';
import VueCarousel from '@/components/molecules/VueCarousel/VueCarousel.vue';
import { ICarouselImage } from '@/components/molecules/VueCarousel/ICarouselImage';
import VueText from '@/components/atoms/VueText/VueText.vue';
import VueIconWallet from '@/components/atoms/icons/VueIconWallet/VueIconWallet.vue';
import VueIconBlog from '@/components/atoms/icons/VueIconBlog/VueIconBlog.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridColumn,
    VueCardHeader,
    VueGridRow,
    VueCard,
    VueCardBody,
    VueCarousel,
    VueText,
    VueIconWallet,
    VueIconBlog,
  },
  middleware: 'auth',
  props: {
    loading: { type: Boolean, default: false },
  },
  setup() {
    const { app } = useContext();
    const image2: ICarouselImage = {
      copyright: 'e-groweed.com',
      alt: 'egroweed',
      url: '/images/egroweed/egroweed2.png',
    };
    const image3: ICarouselImage = {
      copyright: 'e-groweed.com',
      alt: 'egroweed',
      url: '/images/egroweed/egroweed3.png',
    };
    const image4: ICarouselImage = {
      copyright: 'blog.bancannabis.org',
      alt: 'blog.bancannabis',
      url: '/images/egroweed/project1.png',
    };
    const images = [image2, image3, image4];
    const pending = ref(false);
    const user = computed(() => app.$auth.user);

    return { pending, user, images };
  },
  head: {
    title: 'Bancannabis | Dashboard',
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
  max-width: 80rem;
  min-height: 40rem;
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

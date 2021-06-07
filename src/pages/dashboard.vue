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
            <vue-card-body :class="$style.card_big_body"> <wallet /> </vue-card-body>
          </vue-card>
        </vue-grid-column>
        <vue-grid-column>
          <vue-card :class="$style.card_little">
            <vue-card-header title="Featured projects"> </vue-card-header>
            <vue-carousel :images="images" :interval="2000" />
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
import wallet from '@/components/organisms/Wallet/Wallet.vue';

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
    wallet,
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
    const images = [image2, image3];
    const pending = ref(false);
    const user = computed(() => app.$auth.user);

    return { pending, user, images };
  },
  head: {
    title: 'Dashboard',
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
  //background-image: url('/images/card_bg_purple.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-color: black !important;
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
}

.card_row {
  padding: 2rem 2rem 1rem 4rem;
  display: block;
}

.profile_img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 10px auto;
  border: 10px solid #ccc;
}

.column {
  margin-left: auto;
  margin-right: auto;
  width: 15em;
}

.button {
  width: 15em;
  margin-top: 10px;
  text-align: center;
}

div.transparentbox {
  opacity: 0.6;
  margin: 30px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #343a3f;
  filter: alpha(opacity=60); /* This is for IE8 and other earlier browsers */
  min-height: 15rem;
}

div.transparentbox p {
  margin: 5%;
  font-weight: bold;
}

div.transparentbox_header {
  opacity: 0.6;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #343a3f;
  filter: alpha(opacity=60); /* This is for IE8 and other earlier browsers */
  min-height: 5rem;
}
</style>

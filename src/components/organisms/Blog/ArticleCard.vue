<template>
  <nuxt-link :key="article.id" :to="{ name: 'articles-slug', params: { slug: article.slug } }" class="uk-link-reset">
    <vue-card :class="$style.card_big">
      <div class="uk-card-media-top">
        <img :src="getStrapiMedia(article.image.url)" height="100" :class="$style.img" />
      </div>
      <div class="uk-card-body">
        <p v-if="article.category" id="category" class="uk-text-uppercase">
          {{ article.category.name }}
        </p>
        <p id="title" class="uk-text-large">{{ article.title }}</p>
        <hr class="uk-divider-small" />
        <div class="uk-grid-small uk-flex-left" data-uk-grid="true">
          <div>
            <img
              class="avatar"
              :src="getStrapiMedia(article.author.picture.url)"
              style="position: static; border-radius: 50%; object-fit: cover"
              width="40px"
              height="40px"
              :alt="article.title"
            />
          </div>
          <div class="uk-width-expand" :class="$style.autor">
            <p class="uk-margin-remove-bottom">{{ article.author.name }}</p>
            <p class="uk-margin-remove-bottom">{{ article.author.email }}</p>
          </div>
        </div>
      </div>
    </vue-card>
    <!-- <div class="uk-card uk-card-muted">
    </div> -->
  </nuxt-link>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';
import { getStrapiMedia } from '../../../utils/medias';
import VueCard from '../../molecules/VueCard/VueCard.vue';

export default defineComponent({
  name: 'ArticleCard',
  components: { VueCard },
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getStrapiMedia,
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';
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
.img:not([alt]) {
  border: none !important;
  border-radius: 10px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
}
.autor {
  font-size: 0.8rem;
  inline-size: 150px;
  overflow-wrap: break-word;
}
</style>

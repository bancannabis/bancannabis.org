<template>
  <div :class="$style.dashboard">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/dashboard' },
              { label: 'Blog', href: '/dashboardBlog' },
              { label: article.title, href: '' },
            ]"
          />
        </vue-grid-column>
      </vue-grid-row>
      <blog-nav />
    </vue-grid>
    <div
      v-if="article.image"
      id="banner"
      class="uk-height-extra-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding"
      :data-src="getStrapiMedia(article.image.url)"
      :class="$style.banner"
      uk-img
    >
      <h1 :class="$style.h1">{{ article.title }}</h1>
    </div>
    <div class="uk-section">
      <div class="uk-container uk-container-big">
        <!-- eslint-disable vue/no-v-html -->
        <div v-if="article.content" id="editor" v-html="$md.render(article.content)" />
        <!-- eslint-enable vue/no-v-html -->
        <br />
        <p v-if="article.published_at">
          {{ moment(article.published_at).format('MMM Do YY') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueBreadcrumb from '@/components/molecules/VueBreadcrumb/VueBreadcrumb.vue';
import BlogNav from '@/components/organisms/Blog/BlogNav/BlogNav.vue';
import moment from 'moment';
import { getStrapiMedia } from '../../utils/medias';
import { getMetaTags } from '../../utils/seo';

export default defineComponent({
  name: 'SlugArticle',
  components: {
    VueGrid,
    BlogNav,
    VueGridColumn,
    VueBreadcrumb,
    VueGridRow,
  },
  async asyncData({ $strapi, params }) {
    const matchingArticles = await $strapi.find('articles', {
      slug: params.slug,
    });
    return {
      article: matchingArticles[0],
      global: await $strapi.find('global'),
      categories: await $strapi.find('categories'),
    };
  },
  data() {
    return {
      apiUrl: process.env.strapiBaseUri,
    };
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      metaTitle: this.article.title,
      metaDescription: this.article.description,
      shareImage: this.article.image,
    };

    return {
      titleTemplate: `%s | ${siteName}`,
      title: fullSeo.metaTitle,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: 'favicon',
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
  methods: {
    moment,
    getStrapiMedia,
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';
.dashboard {
  padding-top: $nav-bar-height;
}
.banner {
  margin: 0px !important;
}
.h1 {
  line-height: 1.2 !important;
  font-weight: 400 !important;
  font-size: 10em;
}
</style>

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
      <h1 :class="[$style.h1, $style.center_text, $style.glitch]">{{ article.title }}</h1>
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
import moment from 'moment';
import { getStrapiMedia } from '../../utils/medias';
import { getMetaTags } from '../../utils/seo';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueBreadcrumb from '@/components/molecules/VueBreadcrumb/VueBreadcrumb.vue';
import BlogNav from '@/components/organisms/Blog/BlogNav/BlogNav.vue';

export default defineComponent({
  name: 'SlugArticle',
  auth: false,
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
  max-height: 28rem;
}
.h1 {
  text-size-adjust: 80% !important;
  font-size: 4rem !important;
}

.center_text {
  margin: auto;
  font-family: 'Montserrat', sans-serif;
  font-size: 120px;
  text-transform: uppercase;
}

.glitch {
  position: relative;
  color: white;
  mix-blend-mode: lighten;

  &:before,
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    width: 100%;
    background: black;
    clip: rect(0, 0, 0, 0);
  }

  &:before {
    left: -1px;
    text-shadow: 1px 0 rgba(red, 0.7);
  }

  &:after {
    left: 1px;
    text-shadow: -1px 0 rgba(blue, 0.7);
  }

  &:hover {
    &:before {
      text-shadow: 4px 0 rgba(red, 0.7);
      animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse;
    }
    &:after {
      text-shadow: -5px 0 rgba(blue, 0.7);
      animation: glitch-loop-2 0.8s infinite ease-in-out alternate-reverse;
    }
  }
}

.glitch:hover {
  text-shadow: 4px 0 rgba(255, 0, 0, 0.7);
  animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse;
}

@keyframes glitch-loop-1 {
  0% {
    clip: rect(36px, 9999px, 9px, 0);
  }
  25% {
    clip: rect(25px, 9999px, 99px, 0);
  }
  50% {
    clip: rect(50px, 9999px, 102px, 0);
  }
  75% {
    clip: rect(30px, 9999px, 92px, 0);
  }
  100% {
    clip: rect(91px, 9999px, 98px, 0);
  }
}

@keyframes glitch-loop-2 {
  0% {
    top: -1px;
    left: 1px;
    clip: rect(65px, 9999px, 119px, 0);
  }
  25% {
    top: -6px;
    left: 4px;
    clip: rect(79px, 9999px, 19px, 0);
  }
  50% {
    top: -3px;
    left: 2px;
    clip: rect(68px, 9999px, 11px, 0);
  }
  75% {
    top: 0px;
    left: -4px;
    clip: rect(95px, 9999px, 53px, 0);
  }
  100% {
    top: -1px;
    left: -1px;
    clip: rect(31px, 9999px, 149px, 0);
  }
}
</style>

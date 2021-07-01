<template>
  <Articles :articles="articles" />
</template>

<script>
import Articles from '@/components/organisms/Blog/Articles.vue';
import { getMetaTags } from '../utils/seo';
import { getStrapiMedia } from '../utils/medias';

export default {
  components: {
    Articles,
  },
  data() {
    return {
      articles: [],
      homepage: { hero: { title: '' } },
      global: { defaultSeo: {}, favicon: { url: '' }, siteName: { title: '' } },
    };
  },
  async fetch() {
    this.articles = await this.$strapi.find('articles');
    this.homepage = await this.$strapi.find('homepage');
    this.global = await this.$strapi.find('global');
  },
  head() {
    const { seo } = this.homepage;
    const { defaultSeo, favicon, siteName } = this.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      ...seo,
    };

    return {
      titleTemplate: `%s | ${siteName}`,
      title: fullSeo.metaTitle,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: 'favicon',
          href: getStrapiMedia(favicon?.url),
        },
      ],
    };
  },
  mounted() {
    console.log(this.articles);
  },
};
</script>

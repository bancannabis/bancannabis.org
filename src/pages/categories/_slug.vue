<template>
  <div>
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/dashboard' },
              { label: 'Blog', href: '/dashboardBlog' },
              { label: category.name.toUpperCase(), href: '' },
            ]"
          />
        </vue-grid-column>
      </vue-grid-row>
      <blog-nav />
      <vue-grid-row>
        <vue-grid-column>
          <Articles :articles="articles || []" />
        </vue-grid-column>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueBreadcrumb from '@/components/molecules/VueBreadcrumb/VueBreadcrumb.vue';
import BlogNav from '@/components/organisms/Blog/BlogNav/BlogNav.vue';
import Articles from '@/components/organisms/Blog/Articles.vue';
import { getMetaTags } from '../../utils/seo';
import { getStrapiMedia } from '../../utils/medias';

export default defineComponent({
  name: 'SlugCategories',
  components: {
    Articles,
    VueGrid,
    VueGridRow,
    VueGridColumn,
    VueBreadcrumb,
    BlogNav,
  },
  async asyncData({ $strapi, params }) {
    const matchingCategories = await $strapi.find('categories', {
      slug: params.slug,
    });
    return {
      category: matchingCategories[0],
      articles: await $strapi.find('articles', {
        'category.name': params.slug,
      }),
      global: await $strapi.find('global'),
    };
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      metaTitle: `${this.category.name} articles`,
      metaDescription: `All articles about ${this.category.name}`,
    };

    return {
      title: fullSeo.metaTitle,
      titleTemplate: `%s | ${siteName}`,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: 'favicon',
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
});
</script>

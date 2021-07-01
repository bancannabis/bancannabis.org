<template>
  <div :class="$style.dashboard">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/dashboard' },
              { label: 'Blog', href: '#modal-full' },
            ]"
          />
        </vue-grid-column>
      </vue-grid-row>
      <blog-nav />
      <vue-grid-row>
        <blog />
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
import Blog from './blog.vue';

export default defineComponent({
  name: 'DashboardBlog',
  components: {
    Blog,
    VueGrid,
    VueGridRow,
    BlogNav,
    VueBreadcrumb,
    VueGridColumn,
  },
  data() {
    return {
      categories: [],
    };
  },
  async fetch() {
    this.categories = await this.$strapi.find('categories');
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';
.dashboard {
  padding-top: $nav-bar-height;
}
</style>

<template>
  <div class="uk-navbar-left">
    <ul class="uk-navbar-nav">
      <li v-for="category in categories" :key="category.id">
        <nuxt-link :to="{ name: 'categories-slug', params: { slug: category.slug } }" tag="a">
          {{ category.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'BlogNav',
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

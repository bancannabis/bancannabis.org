<template>
  <div class="uk-navbar-left" :class="$style.categories">
    <ul class="uk-navbar-nav">
      <li v-for="category in categories" :key="category.id" :class="$style.li">
        <nuxt-link :to="{ name: 'categories-slug', params: { slug: category.slug } }" tag="a" :class="$style.a">
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
  auth: false,
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
.categories {
  max-height: 8rem;
}

.li {
  margin: 0 20px;
  position: relative;
}

.a {
  text-decoration: none;
  display: block;
  padding: 5px 0;
  font-family: 'Open Sans';
  font-size: 26px;
  line-height: 1;
  font-weight: bold;
  position: relative;
  z-index: 1;
  text-align: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, black, black 50%, rgb(63, 63, 63) 50%);
  background-size: 200% 100%;
  background-position: -100%;
  transition: all 0.3s ease-in-out;
  &:before {
    display: block;
    content: '';
    width: 0;
    height: 3px;
    bottom: 5px;
    left: 0;
    bottom: 25px;
    z-index: 0;
    position: absolute;
    background: #0043ce;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    background-position: 0%;
    &:before {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="uk-child-width-1-4@m uk-grid-match" uk-grid>
    <ArticleCard v-for="article in leftArticles" :key="article.id" :article="article" />
    <ArticleCard v-for="article in rightArticles" :key="article.id" :article="article" />
  </div>
</template>

<script>
import ArticleCard from './ArticleCard';

export default {
  components: {
    ArticleCard,
  },
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    leftArticlesCount() {
      return Math.ceil(this.articles.length / 5);
    },
    leftArticles() {
      return this.articles.slice(0, this.leftArticlesCount);
    },
    rightArticles() {
      return this.articles.slice(this.leftArticlesCount, this.articles.length);
    },
  },
};
</script>

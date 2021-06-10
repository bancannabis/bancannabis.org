<template>
  <div :class="$style.vueFooter">
    <vue-grid text-align="center">
      <vue-grid-row>
        <vue-grid-column></vue-grid-column>
        <vue-grid-column>
          <small>&copy; Copyright {{ year }} Bancannabis.org</small>
          <small>
            <a href="https://www.linkedin.com/company/bancannabis" target="_blank" rel="noopener noreferrer">
              <img src="images/banca.png" alt="bancannabis.co" />
            </a>
          </small>
        </vue-grid-column>
        <vue-grid-column></vue-grid-column>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
import VueGrid from '../VueGrid/VueGrid.vue';
import VueGridRow from '../VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '../VueGrid/VueGridColumn/VueGridColumn.vue';

export default {
  name: 'VueFooter',
  components: {
    VueGrid,
    VueGridColumn,
    VueGridRow,
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.vueFooter {
  padding: $footer-padding;
  text-align: center;
  background: $footer-bg;

  i {
    height: $text-4;
    width: $text-4;
    fill: $footer-link-color;
    margin: 0 $space-12;

    &:hover {
      fill: $footer-link-hover-color;
    }
  }

  img {
    max-width: 5rem;
    border: none !important;
  }

  small {
    display: inline-block;
    margin: $space-12 0;
  }

  a {
    color: #9cbe34;
    font-weight: $footer-link-font-weight;

    &:hover {
      color: #291e59;
    }
  }
}
</style>

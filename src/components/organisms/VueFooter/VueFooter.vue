<template>
  <div :class="$style.vueFooter">
    <vue-grid with-vertical-space text-align="center">
      <vue-grid-row>
        <vue-grid-column>
          <small>&copy; Copyright {{ year }} Bancannabis.org</small>
        </vue-grid-column>

        <vue-grid-column>
         
        </vue-grid-column>

        <vue-grid-column>
           <small>
            <a href="https://www.linkedin.com/company/bancannabis" target="_blank" rel="noopener noreferrer">
              <img src="images/banca.png" alt="bancannabis.co" /> By bancannabis Team
            </a>
          </small>
        </vue-grid-column>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
import VueGrid from '../VueGrid/VueGrid.vue';
import VueGridRow from '../VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '../VueGrid/VueGridColumn/VueGridColumn.vue';
import VueIconGithubAlt from '../../atoms/icons/VueIconGithubAlt/VueIconGithubAlt.vue';
import VueIconTwitterSquare from '../../atoms/icons/VueIconTwitterSquare/VueIconTwitterSquare.vue';

export default {
  name: 'VueFooter',
  components: {
    VueIconTwitterSquare,
    VueIconGithubAlt,
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
  background: $footer-bg;

  i {
    height: $font-size-h1;
    width: $font-size-h1;
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
    color: #291e59;
    font-weight: $footer-link-font-weight;

    &:hover {
      color: #9cbe34;
    }
  }

}
</style>

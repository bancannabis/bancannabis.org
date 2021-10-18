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
    <!--Waves Container-->
    <div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax" :class="$style.parallax">
          <use xlink:href="#gentle-wave" x="28" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="28" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="28" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="28" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
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
/* waves */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 15s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 16s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  h1 {
    font-size: 24px;
  }
}
</style>

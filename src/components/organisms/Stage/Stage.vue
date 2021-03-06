<template>
  <div ref="stage" :class="$style.stage">
    <div v-if="isParticlesJSLoaded" id="particles-js" ref="canvas" :class="$style.canvas"></div>

    <vue-grid :class="$style.content" with-vertical-space text-align="center">
      <vue-grid-row>
        <vue-grid-column>
          <img src="images/bancannabis.png" alt="vuesion" />
        </vue-grid-column>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-column>
          <vue-headline level="1"> BANCANNABIS.ORG </vue-headline>
        </vue-grid-column>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-column>
          <div :class="$style.subTittle">
            {{ $t('App.core.description') }}
            <div v-if="isCodeLoaded" class="console-container">
              <span id="text"></span>|
              <div id="console" class="console-underscore hidden"></div>
            </div>
          </div>
        </vue-grid-column>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-column> </vue-grid-column>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueHeadline from '@/components/atoms/VueHeadline/VueHeadline.vue';

export default {
  components: { VueHeadline, VueGridColumn, VueGridRow, VueGrid },
  data() {
    return {
      isParticlesJSLoaded: true,
      isCodeLoaded: true,
    };
  },
  head() {
    return {
      script: [
        {
          hid: 'particles',
          src: 'js/particles.js',
          defer: true,
          callback: () => {
            this.isParticlesJSLoaded = true;
          },
        },
        {
          hid: 'code',
          src: 'js/code.js',
          defer: false,
          callback: () => {
            this.isCodeLoaded = true;
          },
        },
      ],
    };
  },
  computed: {},
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.handleResize();
    /* CircleAnimation(this.$refs.canvas); */
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      const canvas: HTMLCanvasElement = this.$refs.canvas;
      const stage: HTMLElement = this.$refs.stage;
      const stageRect: DOMRect =
        stage.getClientRects().length > 0
          ? stage.getClientRects().item(0)
          : ({
              width: 0,
              height: 0,
            } as DOMRect);

      canvas.width = stageRect.width;
      canvas.height = stageRect.height;
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.stage {
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  text-shadow: 0 0 5px rgba(15, 15, 15, 0.4);
  padding-top: $space-84;
  align-content: center;

  img {
    max-width: $space-128;
  }

  .canvas {
    position: absolute;
    background-color: transparent;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .github {
      font-size: $font-size-h1;
      display: inline-block;
      background: var(--brand-primary-bg-color);

      &:hover {
        box-shadow: var(--brand-elevation-3);
      }

      i {
        height: $font-size-h1;
        width: $font-size-h1;
      }
    }
  }
}

@include mediaMin(tabletPortrait) {
  .stage {
    min-height: 50vh;
  }
}

@include mediaMin(tabletLandscape) {
  .stage {
    min-height: 60vh;
  }
}

.subTittle {
  font-weight: 800;

  .console-container {
    font-family: Khula;
    font-size: 4em;
    text-align: center;
    height: 600px;
    width: 600px;
    display: block;
    position: absolute;
    color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-bottom: 10px;
  }
  .console-underscore {
    display: inline-block;
    position: absolute;
    top: -0.14em;
    left: 10px;
  }
}

.canvas {
  width: 100%;
  position: absolute;
  background-color: transparent;
  left: 0;
  top: 0;
  z-index: -1;

  @include mediaMin(tabletPortrait) {
    min-height: 50vh;
  }
}

.github {
  font-size: $font-size-h1;
  display: inline-block;
  color: #64b15e;
  border-radius: 50%;

  &:hover {
    color: #54057b;
    box-shadow: black;
  }

  i {
    height: $font-size-h1;
    width: $font-size-h1;
  }
}
</style>

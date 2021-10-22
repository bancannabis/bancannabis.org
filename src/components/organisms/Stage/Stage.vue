<template>
  <div ref="stage" :class="$style.stage">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <canvas v-if="isParticlesJSLoaded" id="canvas" ref="canvas" class="canvas" :class="$style.canvas"></canvas>

    <vue-grid text-align="center">
      <vue-grid-row>
        <vue-grid-column>
          <img
            ref="img"
            :class="$style.logo"
            class="animate__animated animate__backInDown animate__slower"
            src="images/banca.png"
            alt="bancannabis"
          />
        </vue-grid-column>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-column>
          <vue-headline ref="title" level="2" class="animate__animated animate__slower animate__bounce">
            BANCANNABIS.ORG
          </vue-headline>
          <!-- <div class="wrap" :class="$style.wrap">
            <div v-for="(particle, i) in Array(300).fill(0)" :key="i" class="c" :class="$style.c"></div>
          </div> -->
        </vue-grid-column>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-column>
          <div :class="$style.subTittle" class="animate__animated animate__slower animate__lightSpeedInLeft">
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
import { useContext } from '@nuxtjs/composition-api';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueHeadline from '@/components/atoms/VueHeadline/VueHeadline.vue';
// import VueText from '@/components/atoms/VueText/VueText.vue';

export default {
  components: { VueGridColumn, VueGridRow, VueGrid, VueHeadline },
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
          hid: 'animation',
          src: 'js/animation.js',
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
  computed: {
    theme() {
      const { store } = useContext();
      const theme = store.getters['app/theme'];
      return theme.value;
    },
  },
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
    animate() {
      const title: HTMLCanvasElement = this.$refs.title;
      console.log(title);
      title.classList.add('elementToFadeInAndOut');
      // Wait until the animation is over and then remove the class, so that
      // the next click can re-add it.
      setTimeout(function() {
        title.classList.remove('elementToFadeInAndOut');
      }, 4000);
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
    max-width: $space-384;
    transition: transform 0.7s ease-in-out;
  }

  img:hover {
    transform: rotate(360deg) !important;
  }

  .canvas {
    position: absolute;
    background-color: transparent;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
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

.logo {
  font-size: 4rem;
  display: inline-block;
  color: #64b15e;
  border-radius: 50%;

  &:hover {
    color: #54057b !important;
    box-shadow: black !important;
  }

  i {
    height: 4rem;
    width: 4rem;
  }
}

.fade {
  width: 200px;
  height: 200px;
  background: red;
  opacity: 0;
}

.elementToFadeInAndOut {
  animation: fadeInOut 4s linear forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

$total: 300; // total particles
$orb-size: 300px;
$particle-size: 2px;
$time: 14s;
$base-hue: 0; // change for diff colors (180 is nice)

.wrap {
  position: relative;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: rotate $time infinite linear; // rotate orb
}

@keyframes rotate {
  100% {
    transform: rotateY(360deg) rotateX(360deg);
  }
}

.c {
  position: absolute;
  width: $particle-size;
  height: $particle-size;
  border-radius: 50%;
  opacity: 0;
}

@for $i from 1 through $total {
  $z: (random(360) * 1deg); // random angle to rotateZ
  $y: (random(360) * 1deg); // random to rotateX
  $hue: ((40 / $total * $i) + $base-hue); // set hue

  .c:nth-child(#{$i}) {
    // grab the nth particle
    animation: orbit#{$i} $time infinite;
    animation-delay: ($i * 0.01s);
    background-color: var(--brand-high-emphasis-text-color);
  }

  @keyframes orbit#{$i} {
    20% {
      opacity: 1; // fade in
    }
    30% {
      transform: rotateZ(-$z) rotateY($y) translateX($orb-size) rotateZ($z); // form orb
    }
    80% {
      transform: rotateZ(-$z) rotateY($y) translateX($orb-size) rotateZ($z); // hold orb state 30-80
      opacity: 1; // hold opacity 20-80
    }
    100% {
      transform: rotateZ(-$z) rotateY($y) translateX(($orb-size * 3)) rotateZ($z); // translateX * 3
    }
  }
}
</style>

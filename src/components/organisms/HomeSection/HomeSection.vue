<template>
  <div :class="[$style.homeSection, alternative ? $style.alternative : null]">
    <vue-grid space="none">
      <vue-grid-row :class="[flip ? $style.flip : null]">
        <vue-grid-column v-if="image" tablet-portrait="50%">
          <div :class="$style.container" class="container">
            <vue-image :src="image" :native="false" :class="$style.image" />
            <div v-if="video" :class="$style.centered" class="centered">
              <a :class="$style.playbtn" class="play-btn" @click="onClickImage()"></a>
            </div>
          </div>
        </vue-grid-column>
        <vue-grid-column tablet-portrait="50%">
          <slot />
        </vue-grid-column>
      </vue-grid-row>
    </vue-grid>

    <div id="myModal" :class="$style.modal" class="modal">
      <div :class="$style.modalcontent">
        <span :class="$style.close" class="close" @click="onClickSpan()">&times;</span>
        <video id="myVideo" :class="$style.centeredVideo" width="600" height="600" controls>
          <source :src="video" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from '@nuxtjs/composition-api';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueImage from '@/components/atoms/VueImage/VueImage.vue';

export default {
  name: 'HomeSection',
  components: {
    VueImage,
    VueGridColumn,
    VueGridRow,
    VueGrid,
  },
  props: {
    image: { type: String, required: false },
    video: { type: String, required: false },
    alternative: { type: Boolean, default: false },
    flip: { type: Boolean, default: false },
  },
  setup() {
    const showVideoModal = ref(false);
    return {
      showVideoModal,
    };
  },
  methods: {
    onClickImage() {
      this.showVideoModal = false;
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
      const video = document.getElementById('myVideo');
      video.play();
    },
    onClickSpan() {
      const modal = document.getElementById('myModal');
      const video = document.getElementById('myVideo');
      video.pause();
      video.currentTime = 0;
      video.load();
      modal.style.display = 'none';
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

/* modal */
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: none;
  background-color: rgba(0, 0, 0, 0.4);
}
.centeredVideo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
}

.modalcontent {
  background-color: transparent;
  margin: auto;
  padding: 20px;
  width: 80%;
}
.close {
  color: rgb(18, 207, 34);
  float: right;
  font-size: 60px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #663aab;
  text-decoration: none;
  cursor: pointer;
  animation-name: rotate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.container {
  position: relative;
  text-align: center;
  color: white;
}

/* buton */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.playbtn {
  width: 100px;
  height: 100px;
  background: radial-gradient(rgba(134, 17, 180, 0.8) 60%, rgb(86, 15, 167) 62%);
  border-radius: 50%;
  position: relative;
  display: block;
  margin: 100px auto;
  box-shadow: 0px 0px 25px 3px rgba(85, 9, 156, 0.8);
}

/* triangle */
.playbtn::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translateX(-40%) translateY(-50%);
  transform: translateX(-40%) translateY(-50%);
  transform-origin: center center;
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 25px solid #fff;
  z-index: 100;
  -webkit-transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

/* pulse wave */
.playbtn:before {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation: pulsate1 2s;
  animation: pulsate1 2s;
  -webkit-animation-direction: forwards;
  animation-direction: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: steps;
  animation-timing-function: steps;
  opacity: 1;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.75);
  top: -30%;
  left: -30%;
  background: rgba(198, 16, 0, 0);
}

@-webkit-keyframes pulsate1 {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 1;
    box-shadow: inset 0px 0px 25px 3px rgba(255, 255, 255, 0.75), 0px 0px 25px 10px rgba(255, 255, 255, 0.75);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
    box-shadow: none;
  }
}

@keyframes pulsate1 {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 1;
    box-shadow: inset 0px 0px 25px 3px rgba(255, 255, 255, 0.75), 0px 0px 25px 10px rgba(255, 255, 255, 0.75);
  }
  100% {
    -webkit-transform: scale(1, 1);
    transform: scale(1);
    opacity: 0;
    box-shadow: none;
  }
}

.alternative {
  background: var(--brand-secondary-bg-color);
}

.flip {
  @include mediaMin(tabletPortrait) {
    flex-direction: row-reverse;
  }
}

.image {
  min-height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;

  @include mediaMin(tabletPortrait) {
    min-height: 512px;
  }
}
</style>

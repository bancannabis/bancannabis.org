<template>
  <div :class="$style.vueFooter">
    <vue-grid with-vertical-space text-align="center" :class="$style.front">
      <vue-grid-row>
        <vue-grid-column>
          <small>&copy; Copyright {{ year }} Bancannabis.org</small>
        </vue-grid-column>

        <vue-grid-column>
          <div :class="$style.vueFooterCard">
            <div class="text">
              <p>{{ $t('App.core.footer.suscribe') }}</p>
            </div>
            <input id="useremail" v-model="email" type="email" :placeholder="$t('common.email.placeholder')" required />
            <input id="submit" type="submit" :value="$t('common.submit')" @click="handleSubmit()" />
          </div>
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
    <!--Waves Container-->
    <div :class="$style.behind_container">
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
        :class="$style.behind"
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
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
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
  data() {
    return {
      email: '',
      notification: false,
    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.email !== '' && this.email.match(/^[^\s@]+@[^\s@]+$/)) {
          const response = await this.$strapi.create('newsletter-subscribers', {
            email: this.email.toLowerCase(),
          });
          if (typeof response === 'object') {
            addNotification({
              title: 'Success!',
              text: 'Successfully registered',
            });
          }
        } else {
          addNotification({
            title: 'Error!',
            text: 'Wrong Mail',
          });
        }
      } catch (err) {
        console.log(err);
        addNotification({
          title: 'Warning',
          text: 'Email already registered',
        });
      }
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.vueFooterCard {
  /*   border: border-box;
  border-radius: 8px;
  background-color: transparent;
  height: auto;
  width: 300px;
  padding: 30px 25px;
  box-shadow: 0px 10px 20px #000000;
  margin: auto;
  margin-top: 10%; */

  div {
    text-align: center;
    /*     margin-bottom:  1px; */
  }

  .fas {
    color: #d63356;
    font-size: 2em;
  }

  p {
    margin: 0;
  }

  input[type='email'],
  input[type='submit'] {
    border-radius: 45px;
    padding-left: 15px;
    padding-right: 5px;
  }
  input[type='email'] {
    background-color: transparent;
    border: solid #614ce6;
  }

  input[type='submit'] {
    background-color: #614ce6;
    border: solid #614ce6;
    margin-left: -30px;
  }

  ::selection {
    background-color: #614ce6;
  }
}

.vueFooter {
  padding: $footer-padding;
  text-align: center;
  background: $footer-bg;

  i {
    height: 4rem;
    width: 4rem;
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

.front {
  display: block;
  z-index: 5;
  position: relative;
}

.behind_container {
  position: relative;
  top: -18px;
}
.behind {
  display: block;
  z-index: 3;
}

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

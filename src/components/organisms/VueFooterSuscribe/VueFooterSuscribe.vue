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
  </div>
</template>

<script lang="ts">
import VueGrid from '../VueGrid/VueGrid.vue';
import VueGridRow from '../VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '../VueGrid/VueGridColumn/VueGridColumn.vue';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';

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
</style>

<template>
  <div :class="$style.dashboard">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/dashboard' },
              { label: 'Dashboard', href: '/dashboard' },
            ]"
          />
        </vue-grid-column>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-column>
          <vue-card :class="$style.card_big">
            <vue-card-header
              image="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/272/waving-hand_1f44b.png"
              :title="$t('App.core.dashboard.greetings')"
              :subtitle="user.name"
            />
            <vue-card-body :class="$style.card_big_body"> </vue-card-body>
          </vue-card>
        </vue-grid-column>
        <vue-grid-column>
          <vue-card :class="$style.card_little">
            <vue-card-header title="Featured projects"> </vue-card-header>
            <vue-carousel :images="images" :interval="2000" />
          </vue-card>
        </vue-grid-column>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
/* istanbul ignore file */
import { defineComponent, ref, useContext, computed } from '@nuxtjs/composition-api';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueBreadcrumb from '@/components/molecules/VueBreadcrumb/VueBreadcrumb.vue';
import VueButton from '@/components/atoms/VueButton/VueButton.vue';
import VueCard from '@/components/molecules/VueCard/VueCard.vue';
import VueCardHeader from '@/components/molecules/VueCard/VueCardHeader/VueCardHeader.vue';
import VueImage from '@/components/atoms/VueImage/VueImage.vue';
import VueInput from '@/components/atoms/VueInput/VueInput.vue';
import VueCardBody from '@/components/molecules/VueCard/VueCardBody/VueCardBody.vue';
import VueCardFooter from '@/components/molecules/VueCard/VueCardFooter/VueCardFooter.vue';
import VueCarousel from '@/components/molecules/VueCarousel/VueCarousel.vue';
import { ICarouselImage } from '@/components/molecules/VueCarousel/ICarouselImage';

export default defineComponent({
  name: 'Dashboard',
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridColumn,
    VueCardHeader,
    VueButton,
    VueGridRow,
    VueCard,
    VueImage,
    VueInput,
    VueCardBody,
    VueCardFooter,
    VueCarousel,
  },
  middleware: 'auth',
  props: {
    loading: { type: Boolean, default: false },
  },
  setup() {
    const { $axios, app, redirect } = useContext();
    const image2: ICarouselImage = {
      copyright: 'e-groweed.com',
      alt: 'egroweed',
      url: '/images/egroweed/egroweed2.png',
    };
    const image3: ICarouselImage = {
      copyright: 'e-groweed.com',
      alt: 'egroweed',
      url: '/images/egroweed/egroweed3.png',
    };
    const images = [image2, image3];

    const pending = ref(false);
    const user = computed(() => app.$auth.user);
    const onClick = async () => {
      const requests: any[] = [];

      for (let i = 0; i < 10; i++) {
        requests.push($axios.$get('/protected'));
      }
      try {
        pending.value = true;
        // const data = await Promise.all(requests);
        // console.info(data); // eslint-disable-line
      } catch (e) {
        console.error(e); // eslint-disable-line
      } finally {
        pending.value = false;
      }
    };
    return { pending, onClick, user, images };
  },
  data(): any {
    return {
      name: '',
      disabled: true,
      color: 'danger',
      strapiURL: process.env.strapiURL,
      cancel: false,
      upload: '',
      avatar: '',
    };
  },
  head: {
    title: 'Dashboard',
  },
  mounted() {
    if (this.user.avatar) {
      const imagen_nav = document.getElementById('profile_imagen_nav');
      imagen_nav.setAttribute('src', this.strapiURL + this.user.avatar.url);
    }
  },
  methods: {
    onSelectedImagen(e: any): void {
      const image = e.target.files[0];
      this.avatar = image;
      this.upload = URL.createObjectURL(image);
      const imagen = document.getElementById('profile_imagen');
      imagen.style.backgroundImage = 'url(' + this.upload + ')';
    },
    onUpdate(): void {
      if (this.color == 'danger') {
        this.disabled = false;
        this.color = 'success';
        this.cancel = true;
        this.loading = false;
        this.name = '';
        const imagen = document.getElementById('profile_imagen');
        imagen.style.backgroundImage =
          'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.djrHhPrOVynppSdGJ2dtPgHaHa%26pid%3DApi&f=1)';
        addNotification({ title: 'Info!', text: 'Can edit now.', type: 'default' });
      }
      if (this.color == 'success' && (this.name != '' || this.upload)) {
        this.loading = true;
        const uploadImagen = async (Data: any) => {
          const data = new FormData();
          data.append('files', Data);
          try {
            const response = await this.$axios.post(this.strapiURL + '/upload', data, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            // console.log(response.data[0])
            if (response.status === 200) {
              return response.data[0];
            }
          } catch (e) {
            addNotification({
              title: 'Error!',
              text: 'Please try again!',
              type: 'error',
            });
          }
        };
        const updateUser = async (Data: any) => {
          try {
            const response = await this.$axios.put(this.strapiURL + '/users/' + this.user.id, Data);
            // console.log(response);
            if (response.status === 200) {
              return 'updated';
            }
          } catch (e) {
            addNotification({
              title: 'Error!',
              text: 'Please try again!',
              type: 'error',
            });
          }
        };
        if (this.avatar && !this.name) {
          uploadImagen(this.avatar).then((avatar) => {
            this.user.avatar.url = avatar.url;
            const data = {
              avatar,
            };
            updateUser(data).then((res) => {
              addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
              this.disabled = true;
              this.color = 'danger';
              this.cancel = false;
              this.loading = false;
              this.upload = '';
              const imagen = document.getElementById('profile_imagen');
              imagen.style.backgroundImage = 'url(' + this.strapiURL + this.avatar + ')';
            });
          });
        }
        if (!this.avatar && this.name) {
          const data = {
            id: this.user.id,
            name: this.name,
          };
          updateUser(data).then((res) => {
            addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
            this.disabled = true;
            this.color = 'danger';
            this.user.name = this.name;
            this.cancel = false;
            this.loading = false;
            this.updateAvatarPic();
          });
        }
        if (this.avatar && this.name) {
          uploadImagen(this.avatar).then((avatar) => {
            this.user.avatar.url = avatar.url;
            const data = {
              name: this.name,
              avatar,
            };
            updateUser(data).then((res) => {
              addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
              this.disabled = true;
              this.color = 'danger';
              this.user.name = this.name;
              this.cancel = false;
              this.loading = false;
              this.updateAvatarPic();
            });
          });
        }
      }
    },
    onCancel(): void {
      this.disabled = true;
      this.color = 'danger';
      this.cancel = false;
      this.loading = false;
      this.updateAvatarPic();
      addNotification({ title: 'Warning!', text: 'Nothing update.', type: 'warning' });
    },
    updateAvatarPic() {
      if (this.user.avatar) {
        const imagen = document.getElementById('profile_imagen');
        imagen.style.backgroundImage = 'url(' + this.strapiURL + this.user.avatar.url + ')';
      }
      if (!this.user.avatar) {
        const imagen = document.getElementById('profile_imagen');
        imagen.style.backgroundImage = 'url(' + 'https://ui-avatars.com/api/?name=' + this.user.name.slice(0, 1) + ')';
      }
    },
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.dashboard {
  padding-top: $nav-bar-height;
}

.card {
  border-radius: 10px !important;
}

.card_big {
  border-radius: 10px !important;
  min-width: auto;
  min-height: 40rem;
  //background-image: url('/images/card_bg_purple.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-color: black !important;
  border: 3px solid black !important;
}
.card_big_body {
  .card_headline {
    margin-top: 7rem;
  }
}

.card_little {
  border-radius: 10px !important;
  max-width: auto;
  max-height: 40rem;
  border: 3px solid black !important;
}

.card_row {
  padding: 2rem 2rem 1rem 4rem;
  display: block;
}

.profile_img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 10px auto;
  border: 10px solid #ccc;
}

.column {
  margin-left: auto;
  margin-right: auto;
  width: 15em;
}

.button {
  width: 15em;
  margin-top: 10px;
  text-align: center;
}

div.transparentbox {
  opacity: 0.6;
  margin: 30px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #343a3f;
  filter: alpha(opacity=60); /* This is for IE8 and other earlier browsers */
  min-height: 15rem;
}

div.transparentbox p {
  margin: 5%;
  font-weight: bold;
}

div.transparentbox_header {
  opacity: 0.6;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #343a3f;
  filter: alpha(opacity=60); /* This is for IE8 and other earlier browsers */
  min-height: 5rem;
}
</style>

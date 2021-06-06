<template>
  <div :class="$style.profile">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/dashboard' },
              { label: 'Profile', href: '/profile' },
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
            <vue-card-body :class="$style.card_big_body">
              <vue-grid-column :class="$style.column">
                <vue-grid-row>
                  <label for="image">
                    <input
                      id="image"
                      type="file"
                      name="image"
                      accept="image/*"
                      style="display: none"
                      :disabled="disabled"
                      @change="onSelectedImagen"
                    />
                    <vue-image
                      v-if="user.avatar"
                      id="profile_imagen"
                      :src="strapiURL + user.avatar.url"
                      :native="false"
                      :class="$style.profile_img"
                    />
                  </label>
                </vue-grid-row>

                <vue-grid-row>
                  <vue-input
                    id="username"
                    :label="$t('common.username.placeholder')"
                    :placeholder="user.username"
                    name="username"
                    :disabled="true"
                  />
                  <vue-input
                    id="name"
                    v-model="name"
                    name="name"
                    type="string"
                    :label="$t('common.name.placeholder')"
                    :placeholder="user.name"
                    :disabled="disabled"
                  />
                  <vue-input
                    id="lastname"
                    v-model="lastname"
                    name="lastname"
                    type="string"
                    :label="$t('common.lastname.placeholder')"
                    :placeholder="user.lastname"
                    :disabled="disabled"
                  />
                  <vue-button :class="$style.button" :color="color" :loading="loading" @click="onUpdate()">
                    Update
                  </vue-button>
                  <vue-button v-if="cancel" :class="$style.button" color="danger" @click="onCancel()">
                    Cancel
                  </vue-button>
                </vue-grid-row>
                <br />
              </vue-grid-column>
            </vue-card-body>
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
import VueImage from '@/components/atoms/VueImage/VueImage.vue';
import VueInput from '@/components/atoms/VueInput/VueInput.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridColumn,
    VueButton,
    VueGridRow,
    VueCard,
    VueImage,
    VueInput,
  },
  middleware: 'auth',
  props: {
    loading: { type: Boolean, default: false },
  },
  setup() {
    const { app } = useContext();
    const pending = ref(false);
    const user = computed(() => app.$auth.user);
    const strapiURL = process.env.strapiURL;
    return { pending, user, strapiURL };
  },
  data(): any {
    return {
      name: '',
      lastname: '',
      disabled: true,
      color: 'danger',
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
      const imagenNav = document.getElementById('profile_imagen_nav');
      imagenNav.setAttribute('src', process.env.strapiURL + this.user.avatar.url);
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
      this.$emit('submit');
      if (this.color === 'danger') {
        this.disabled = false;
        this.color = 'success';
        this.cancel = true;
        this.name = '';
        this.lastname = '';
        const imagen = document.getElementById('profile_imagen');
        imagen.style.backgroundImage =
          'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.djrHhPrOVynppSdGJ2dtPgHaHa%26pid%3DApi&f=1)';
      }
      if (this.color === 'success' && (this.lastname !== '' || this.name !== '' || this.upload)) {
        const uploadImagen = async (Data: any) => {
          const data = new FormData();
          data.append('files', Data);
          try {
            const response = await this.$axios.post(process.env.strapiURL + '/upload', data, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
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
            const response = await this.$axios.put(process.env.strapiURL + '/users/' + this.user.id, Data);
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
        const user = {
          id: this.user.id,
          name: this?.name || this?.user.name,
          lastname: this?.lastname || this?.user.lastname,
          avatar: this?.avatar || this?.user.avatar,
        };
        if (this.avatar) {
          uploadImagen(this.avatar).then((avatar) => {
            this.user.avatar = avatar;
            user.avatar = avatar;
            updateUser(user).then((res) => {
              addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
              this.disabled = true;
              this.color = 'danger';
              this.cancel = false;
              this.upload = '';
              const imagen = document.getElementById('profile_imagen');
              imagen.style.backgroundImage = 'url(' + process.env.strapiURL + this.avatar + ')';
            });
          });
        }
        if (!this.avatar) {
          updateUser(user).then((res) => {
            addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
            this.disabled = true;
            this.color = 'danger';
            this.user.name = this?.name || this?.user.name;
            this.user.lastname = this?.lastname || this?.user.lastname;
            this.cancel = false;
            this.updateAvatarPic();
          });
        }
      } else {
        addNotification({ title: 'Info!', text: 'Waiting for changes.', type: 'default' });
      }
    },
    onCancel(): void {
      this.disabled = true;
      this.color = 'danger';
      this.cancel = false;
      this.updateAvatarPic();
      addNotification({ title: 'Warning!', text: 'Nothing update.', type: 'warning' });
    },
    updateAvatarPic() {
      if (this.user.avatar) {
        const imagen = document.getElementById('profile_imagen');
        imagen.style.backgroundImage = 'url(' + process.env.strapiURL + this.user.avatar.url + ')';
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

.profile {
  padding-top: $nav-bar-height;
}

.card {
  border-radius: 10px;
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
</style>

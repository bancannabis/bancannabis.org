<template>
  <div :class="$style.profile">
    <vue-grid with-vertical-space >
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb :items="[{ label: 'Home', href: '/dashboard' }, { label: 'Profile', href: '/profile' }]" />
        </vue-grid-column>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-column> 
          <vue-card :class="$style.card">
            <vue-grid-column :class="$style.column">
              <!-- <vue-breadcrumb :items="[{ label: 'Home', href: '/dashboard' }, { label: 'Profile', href: '/profile' }]" /> -->
              <vue-grid-row>
                <label for="image">
                  <input type="file" name="image"  accept="image/*" id="image" style="display:none;" :disabled="disabled" @change="onSelectedImagen" />
                    <vue-image v-if="user.avatar"
                      :src="strapiURL + user.avatar.url"
                      :native="false"
                      :class="$style.profile_img"
                      id="profile_imagen"
                    /> 
                    <vue-image v-if="user.avatar == null"
                      :src="'https://ui-avatars.com/api/?name=' + user.username.slice(0, 1)"
                      :native="false"
                      :class="$style.profile_img"
                      id="profile_imagen"
                    />
                </label>
              </vue-grid-row>

              <vue-grid-row>    
                  <vue-input
                    label="Username"
                    :placeholder="user.username"
                    name="username"
                    id="username"
                    :disabled="true"
                  />
                  <vue-input
                    id="name"
                    v-model="name"
                    name="name"
                    type="string"
                    label="Name"
                    :placeholder="user.name"
                    :disabled="disabled"
                  />
                  <vue-button :class="$style.button" :color="color" :loading="loading"  @click="onUpdate()">
                    Update
                  </vue-button> 
                  <vue-button :class="$style.button" v-if="cancel" color="danger"  @click="onCancel()">
                    Cancel
                  </vue-button>
              </vue-grid-row>
              <br />
            </vue-grid-column>
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
import VueHeadline from '@/components/atoms/VueHeadline/VueHeadline.vue';
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
    VueHeadline,
    VueCard,
    VueImage,
    VueInput,
  },
  props: {
    loading: { type: Boolean, default: false },
  },
  middleware: 'auth',
  data(): any {
    return {
      name: '',
      disabled: true,
      color: 'danger',
      strapiURL: process.env.strapiURL,
      cancel: false,
      upload: '',
      avatar: ''
    };
  },
  methods: {
    onSelectedImagen(e: any): void {
      const image = e.target.files[0];
      this.avatar = image
      this.upload = URL.createObjectURL(image)
      let imagen = document.getElementById("profile_imagen");
      imagen.style.backgroundImage = "url(" + this.upload + ")"  
    },
    onUpdate(): void {
      if (this.color == 'danger') {
        this.disabled = false;
        this.color = 'success';
        this.cancel = true;
        this.loading = false;
        this.name= '';
        let imagen = document.getElementById("profile_imagen");
        imagen.style.backgroundImage = "url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.djrHhPrOVynppSdGJ2dtPgHaHa%26pid%3DApi&f=1)"
        addNotification({ title: 'Info!', text: 'Can edit now.', type: 'default' });
      }
      if (this.color == 'success' && (this.name != '' || this.upload) ) {
        this.loading = true
        const uploadImagen = async (Data: any) => {
            const data = new FormData();
            data.append('files', Data);
          try {
            const response = await this.$axios.post(this.strapiURL+ '/upload', data,  {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            //console.log(response.data[0])      
            if (response.status === 200) {
              return response.data[0]
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
            const response = await this.$axios.put(this.strapiURL + '/users/' + this.user.id, Data)
            //console.log(response);
            if (response.status === 200) {
              return 'updated'
            }
          } catch (e) {
            addNotification({
              title: 'Error!',
              text: 'Please try again!',
              type: 'error',
            });
          }
        };
        if(this.avatar && !this.name){ 
          uploadImagen(this.avatar).then((avatar) => {
            this.user.avatar = avatar
            let data = {
              avatar: avatar
            };
            updateUser(data).then((res) => {
              addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
              this.disabled = true;
              this.color = 'danger';
              this.cancel = false;
              this.loading = false;
              this.upload= ''
              let imagen = document.getElementById("profile_imagen");
              imagen.style.backgroundImage = "url(" + this.strapiURL + this.avatar + ")"
            }) 
          });
        }   
        if(!this.avatar && this.name){ 
          let data = {
            id: this.user.id,
            name: this.name
          };
          updateUser(data).then((res) => {
            addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
            this.disabled = true;
            this.color = 'danger';
            this.user.name = this.name
            this.cancel = false;
            this.loading = false;
            this.updateAvatarPic()
          }) 
        }  
        if(this.avatar && this.name){ 
          uploadImagen(this.avatar).then((avatar) => {
            this.user.avatar.url = avatar.url
            let data = {
              name: this.name,
              avatar: avatar
            };
            updateUser(data).then((res) => {
              addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
              this.disabled = true;
              this.color = 'danger';
              this.user.name = this.name
              this.cancel = false;
              this.loading = false;
              this.updateAvatarPic()
            })  
          });
        }  
      }
    },
    onCancel(): void {
      this.disabled = true;
      this.color = 'danger';
      this.cancel = false; 
      this.loading = false;
      this.updateAvatarPic()
      addNotification({ title: 'Warning!', text: 'Nothing update.', type: 'warning' });
    },
    updateAvatarPic(){
      if(this.user.avatar){
        let imagen = document.getElementById("profile_imagen");
        imagen.style.backgroundImage = "url(" + this.strapiURL + this.user.avatar.url + ")"
      }
      if(!this.user.avatar){
        let imagen = document.getElementById("profile_imagen");
        imagen.style.backgroundImage = "url(" + "https://ui-avatars.com/api/?name=" + this.user.name.slice(0, 1) + ")"
      }
    }
  },
  mounted() {
    if(this.user.avatar){
     let imagen_nav = document.getElementById("profile_imagen_nav");
     imagen_nav.setAttribute('src',this.strapiURL + this.user.avatar.url)
     console.log(imagen_nav)
    }
  },
  setup() {
    const { $axios, app } = useContext();
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
    return { pending, onClick, user };
  },
  head: {
    title: 'Dashboard',
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
</style>

<template>
  <div :class="$style.dashboard">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]" />
        </vue-grid-column>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-column>
          <vue-card :class="$style.card">
            <vue-image
              :src="strapiURL + user.avatar.url || 'https://ui-avatars.com/api/?name=' + user.name.slice(0, 1)"
              :native="false"
              :class="$style.profile_img"
            />
            <vue-grid-column :class="$style.column">
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
                <vue-button :class="$style.button" :color="color" id="button" @click="onSubmit()">
                  Update
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
  name: 'Dashboard',
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
  middleware: 'auth',
  data(): any {
    return {
      name: '',
      disabled: true,
      color: 'danger',
      strapiURL: process.env.strapiURL,
    };
  },
  methods: {
    onSubmit(): void {
      if (this.color == 'danger') {
        // console.log(this.user)
        this.disabled = false;
        this.color = 'success';
        addNotification({ title: 'Success!', text: 'Can edit now.', type: 'success' });
      }
      if (this.color == 'success' && this.name != '') {
        let data = {
          name: this.name,
          id: this.user.id,
        };
        const updateUser = async (Data: any) => {
          try {
            const response = await this.$axios.put(this.strapiURL + '/users/' + Data.id, {
              name: Data.name,
            });
            console.log(response);
            if (response.status === 200) {
              addNotification({ title: 'Success!', text: 'Edited.', type: 'success' });
              this.disabled = true;
              this.color = 'danger';
            }
          } catch (e) {
            addNotification({
              title: 'Error!',
              text: 'Please try again!',
              type: 'error',
            });
          }
        };
        updateUser(data);
      }
    },
  },
  mounted() {
    // console.log(this.strapiURL + this.user.avatar.url);
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

.dashboard {
  padding-top: $nav-bar-height;
}
.card {
  border-radius: 10px;
}
.profile_img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 10px auto;
  border: 10px solid #ccc;
  border-radius: 50%;
}
.column {
  margin-left: auto;
  margin-right: auto;
  width: 15em;
}
.button {
  width: 15em;
}
</style>

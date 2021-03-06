import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { brandVariations } from '../../prop-validators';
import VueIconGithub from '../icons/VueIconGithub/VueIconGithub.vue';
import VueButton from './VueButton.vue';

const story = storiesOf('Atoms|Button', module) as any;

story.add(
  'Button Variants',
  () => ({
    components: { VueButton, VueIconGithub },
    data(): any {
      return {
        variations: brandVariations,
        loading: false,
      };
    },
    template: `<div>
<template v-for="variation in variations">
<vue-button @click="onClick" :color="variation">{{ variation }}</vue-button>
<vue-button @click="onClick" :color="variation"><vue-icon-github />&nbsp;{{ variation }} with icon</vue-button>
<vue-button @click="onClick" :color="variation" disabled>{{ variation }} disabled</vue-button>
<vue-button @click="onClick" :color="variation" :loading="loading">{{ variation }} loading</vue-button>
<vue-button @click="onClick" :color="variation" ghost>{{ variation }} ghost</vue-button>
<br />
<br />
<vue-button @click="onClick" :color="variation" block>{{ variation }} block</vue-button>
<br />
<br />
</template>
</div>
`,
    methods: {
      onClick: action('@click'),
    },
    mounted() {
      setInterval(() => {
        this.loading = !this.loading;
      }, 2000);
    },
  }),
  {
    info: {
      components: { VueButton },
    },
  },
);

story.add(
  'Button as Link',
  () => ({
    components: { VueButton },
    template: `<div>
Router-Link<br/>
<vue-button @click="onClick" as="router-link" color="primary" href="/">Router Link</vue-button>
<vue-button @click="onClick" as="router-link" color="primary" href="/" disabled>Router Link</vue-button>
<vue-button @click="onClick" as="router-link" color="primary" href="/" loading>Router Link</vue-button>
<br/>
<br/>
A-Element: <br/>
<vue-button @click="onClick" as="a" color="primary" href="/">Anchor</vue-button>
<vue-button @click="onClick" as="a" color="primary" href="/" disabled>Anchor</vue-button>
<vue-button @click="onClick" as="a" color="primary" href="/" outlined>Anchor</vue-button>
<vue-button @click="onClick" as="a" color="primary" href="/" ghost>Anchor</vue-button>
<vue-button @click="onClick" as="a" color="primary" href="/" loading>Anchor</vue-button>
</div>
`,
    methods: {
      onClick: action('@onClick'),
    },
  }),
  {
    info: {
      components: { VueButton },
    },
  },
);

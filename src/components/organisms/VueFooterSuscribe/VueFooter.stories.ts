import { storiesOf } from '@storybook/vue';
import VueFooter from './VueFooterSuscribe.vue';

const story = storiesOf('Organisms|Footer', module) as any;

story.add(
  'Default',
  () => ({
    components: { VueFooter },
    template: `<vue-footer />`,
  }),
  {
    info: {
      components: { VueFooter },
    },
  },
);

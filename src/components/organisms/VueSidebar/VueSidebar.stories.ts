import { storiesOf } from '@storybook/vue';
import VueIconCode from '../../atoms/icons/VueIconCode/VueIconCode.vue';
import VueSidebar from './VueSidebar.vue';
import VueSidebarGroup from './VueSidebarGroup/VueSidebarGroup.vue';
import VueSidebarGroupItem from './VueSidebarGroupItem/VueSidebarGroupItem.vue';

const story = storiesOf('Organisms|Sidebar', module) as any;

story.add(
  'Default',
  () => ({
    components: { VueSidebar },
    template: `<vue-sidebar>VueSidebar</vue-sidebar>`,
  }),
  {
    info: {
      components: { VueSidebar, VueSidebarGroup, VueSidebarGroupItem },
    },
  },
);

story.add(
  'Internal Navigation',
  () => ({
    components: { VueSidebar, VueSidebarGroup, VueSidebarGroupItem, VueIconCode },
    template: `<vue-sidebar>
  <vue-sidebar-group title="Navigation">
  <vue-sidebar-group-item to="/">
  <vue-icon-code />
  Home
</vue-sidebar-group-item>
  <vue-sidebar-group-item to="/docs">
  Docs
</vue-sidebar-group-item>
  </vue-sidebar-group>
</vue-sidebar>`,
  }),
  {
    info: {
      components: { VueSidebar, VueSidebarGroup, VueSidebarGroupItem },
    },
  },
);

story.add(
  'External Navigation',
  () => ({
    components: { VueSidebar, VueSidebarGroup, VueSidebarGroupItem, VueIconCode },
    template: `<vue-sidebar>
  <vue-sidebar-group title="Navigation">
        <vue-sidebar-group-item>
          <a href="https://github.com/vuesion/vuesion" target="_blank" rel="noopener">
            <vue-icon-code />
            Github
          </a>
        </vue-sidebar-group-item>
  </vue-sidebar-group>
</vue-sidebar>`,
  }),
  {
    info: {
      components: { VueSidebar, VueSidebarGroup, VueSidebarGroupItem },
    },
  },
);

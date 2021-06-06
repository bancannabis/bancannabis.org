<template>
  <div :class="$style.vueSidebarGroup">
    <strong>{{ title }}</strong>
    <ul>
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VueSidebarGroup',
  props: {
    title: {
      required: false,
      type: String,
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.vueSidebarGroup {
  display: block;

  ul {
    padding: 0;
  }

  strong {
    display: block;
    font-weight: $font-weight-bold;
    font-size: $sidebar-group-font-size;
    /*     border-bottom: $sidebar-group-border-bottom; */
    padding-bottom: $space-4;
  }
}
</style>

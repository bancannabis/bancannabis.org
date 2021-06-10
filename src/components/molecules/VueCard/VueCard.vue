<template>
  <div :class="$style.vueCard">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'VueCard',
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.vueCard {
  background-color: $card-bg;
  box-shadow: $card-shadow;
  border: $card-border;
  border-radius: $card-border-radius;
  color: $card-color;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset !important;
}
</style>

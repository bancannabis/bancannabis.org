<template>
  <div :class="$style.sections">
    <div v-for="section in colorSections" :key="section.name">
      <vue-headline level="4">
        {{ section.name.toUpperCase() }}
      </vue-headline>
      <div :class="$style.palette">
        <div v-for="color in section.colors" :key="color.hex" :style="{ background: color.hex }">
          <span>{{ color.name }} ({{ color.hex }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VueHeadline from '@/components/atoms/VueHeadline/VueHeadline.vue';

export default {
  name: 'ColorPalette',
  components: { VueHeadline },
  computed: {
    colorSections() {
      const sections: any = {};
      const arr: any[] = [];

      Object.keys(this.$style).forEach((key: string) => {
        const split = key.split('-');
        const section = split.shift();
        const name = split.join('-');
        const hex = this.$style[key];

        if (!sections[section]) {
          sections[section] = [];
        }

        sections[section].push({ name, hex });
      });

      Object.keys(sections).forEach((key: string) => {
        if (!['sections', 'palette'].includes(key)) {
          arr.push({ name: key, colors: sections[key] });
        }
      });

      return arr;
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.sections {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: $space-20;
}

.palette {
  display: grid;
  grid-template-rows: 1fr;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      background: inherit;
      background-clip: text;
      color: transparent;
      filter: invert(1) grayscale(1) unquote('contrast(100)');
    }
  }
}

:export {
  coral-coral-10: palette-color-level('coral', 10);
  coral-coral-30: palette-color-level('coral', 30);
  coral-coral-50: palette-color-level('coral', 50);
  coral-coral-70: palette-color-level('coral', 70);
  coral-coral-90: palette-color-level('coral', 90);
  coral-coral-100: palette-color-level('coral', 100);

  blue-blue-10: palette-color-level('blue', 10);
  blue-blue-30: palette-color-level('blue', 30);
  blue-blue-50: palette-color-level('blue', 50);
  blue-blue-70: palette-color-level('blue', 70);
  blue-blue-90: palette-color-level('blue', 90);
  blue-blue-100: palette-color-level('blue', 100);

  green-green-10: palette-color-level('green', 10);
  green-green-30: palette-color-level('green', 30);
  green-green-50: palette-color-level('green', 50);
  green-green-70: palette-color-level('green', 70);
  green-green-90: palette-color-level('green', 90);
  green-green-100: palette-color-level('green', 100);

  yellow-yellow-10: palette-color-level('yellow', 10);
  yellow-yellow-30: palette-color-level('yellow', 30);
  yellow-yellow-50: palette-color-level('yellow', 50);
  yellow-yellow-70: palette-color-level('yellow', 70);
  yellow-yellow-90: palette-color-level('yellow', 90);
  yellow-yellow-100: palette-color-level('yellow', 100);

  red-red-10: palette-color-level('red', 10);
  red-red-30: palette-color-level('red', 30);
  red-red-50: palette-color-level('red', 50);
  red-red-70: palette-color-level('red', 70);
  red-red-90: palette-color-level('red', 90);
  red-red-100: palette-color-level('red', 100);

  grey-grey-10: palette-color-level('grey', 10);
  grey-grey-30: palette-color-level('grey', 30);
  grey-grey-50: palette-color-level('grey', 50);
  grey-grey-70: palette-color-level('grey', 70);
  grey-grey-90: palette-color-level('grey', 90);
  grey-grey-100: palette-color-level('grey', 100);
}
</style>

<template>
  <ValidationProvider v-slot="{ invalid }" ref="validator" :vid="id" :name="name" :rules="validation" tag="div">
    <div
      :class="[
        $style.vueSelect,
        multiSelect && $style.multiSelect,
        disabled && $style.disabled,
        invalid && $style.error,
      ]"
    >
      <select
        :id="id"
        :title="label"
        :multiple="multiSelect"
        :required="required"
        :disabled="disabled"
        v-bind="$attrs"
        v-on="{
          ...$listeners,
          input: onInput,
        }"
      >
        <option v-for="(option, idx) in items" :key="idx" :value="option.value" :selected="isSelected(option)">
          {{ option.label }}
        </option>
      </select>

      <i v-if="!multiSelect" :class="$style.icon" />
      <span :class="$style.bar" />
      <label :for="id">{{ label }}<sup v-if="required">*</sup></label>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { ValidationProvider } from 'vee-validate';
import { IItem } from '@/interfaces/IItem';

export default defineComponent({
  name: 'VueSelect',
  components: {
    ValidationProvider,
  },
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    label: { type: String, required: false },
    required: { type: Boolean, default: false },
    validation: { type: [String, Object], default: null },
    value: { type: [String, Number, Boolean, Object], default: null },
    disabled: { type: Boolean, default: false },
    items: { type: Array, required: true },
    multiSelect: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const currentValueAsArray = computed<string[]>(() => props.value?.toString().split('|'));
    const isSelected = (option: IItem) => currentValueAsArray.value?.includes(option.value);
    const onInput = (e: Event) => {
      const selected: IItem[] = [];
      const target: HTMLSelectElement = e.target as HTMLSelectElement;
      const length: number = target.options.length;

      for (let i = 0; i < length; i++) {
        const option: any = target.options[i];
        if (option.selected) {
          selected.push({ label: option.text, value: option.value });
        }
      }

      emit('input', selected.map((option) => option.value).join('|'));
    };

    return {
      isSelected,
      onInput,
    };
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.vueSelect {
  background: $select-bg;
  margin: 1px;
  position: relative;
  border: none;

  select,
  select:active,
  select:focus,
  select:hover {
    outline: none !important;
  }

  select::-ms-expand {
    display: none;
  }

  select {
    padding: $select-padding;
    color: $select-color;
    display: block;
    width: 100%;
    box-shadow: none;
    background: transparent;
    background-image: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-bottom: 1px;
    border-radius: 0;

    &:focus ~ .icon {
      &:before {
        transform: translate(-4px, 0) rotate(45deg);
      }

      &:after {
        transform: translate(4px, 0) rotate(-45deg);
      }
    }
    &:focus ~ label {
      top: -$space-20;
      font-size: 10px;
      font-weight: 10px;
      color: #9182dd;
      height: 10px;
    }
    &:focus ~ .bar:before,
    &:focus ~ .bar:after {
      width: 50%;
    }

    &:hover {
      cursor: pointer;
    }
  }

  select,
  option {
    font-size: $select-font-size;
    font-family: $select-font-family;
    font-weight: $select-font-weight;
  }
  label {
    position: absolute;
    left: 0;
    top: $space-8;
    pointer-events: none;
    transition: 0.2s ease all;
  }
}

.multiple {
  select {
    max-height: $select-multi-max-height;

    option {
      padding: $select-multi-option-padding;
    }
  }

  label {
    top: -$space-20;
    font-size: 10px;
    font-weight: 10px;
    height: 10px;
  }
}

.hasValue {
  label {
    top: -$space-20;
    font-size: 10px;
    font-weight: 10px;
    color: #9182dd;
    height: 10px;
  }
}

.icon {
  position: absolute;
  right: $space-12;
  top: $space-12;
  height: auto;
  width: auto;

  &:before,
  &:after {
    content: '';
    transition: all 0.25s ease-in-out;
    position: absolute;
    background-color: $select-arrow-color;
    width: 2px;
    height: 13px;
  }

  &:before {
    transform: translate(4px, 0) rotate(45deg);
  }

  &:after {
    transform: translate(-4px, 0) rotate(-45deg);
  }
}

.disabled {
  opacity: 0.6;
}

.error {
  select {
    border-bottom-color: $input-error-color;

    &:focus ~ label,
    &.hasValue ~ label {
      color: $input-error-color;
    }
  }

  label {
    color: $input-error-color;
  }

  .bar {
    &:before,
    &:after {
      background: $input-error-color;
    }
  }

  .icon {
    &:before,
    &:after {
      background-color: $input-error-color;
    }
  }
}

.bar {
  position: relative;
  display: block;
  width: 100%;

  &:before,
  &:after {
    content: '';
    height: 10px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: red($color: #000000);
    transition: all 0.2s ease-in-out;
  }
  &:before {
    left: 50%;
  }
  &:after {
    right: 50%;
  }
}
</style>

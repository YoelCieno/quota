<template>
  <button type="button"
          :disabled="disabled"
          :class="computedClasses"
          :title="tooltip"
          @click="onClick"
  >
    <span class="title">{{ title }}</span>
    <slot v-if="hasSlot" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  classModifiers?: string[];
  disabled?: boolean;
  hasError?: boolean;
  hasSlot?: boolean;
  icon?: string;
  customPrefix?: boolean;
  active?: boolean;
  title?: string;
  tooltip?: string;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const defaultClassName = 'g-button';
const computedClasses = computed(() => {
  const iconPrefix = props.customPrefix ? '' : 'icon-';
  if (!props.classModifiers || !props.classModifiers.length) {
    return !props.icon ? defaultClassName : `${defaultClassName} ${iconPrefix}${props.icon}`;
  }
  const modifiers = props.classModifiers.map((cm) => `${defaultClassName}--${cm}`).join(' ');

  const baseClasses = !props.icon ? `${defaultClassName} ${modifiers}` : `${defaultClassName} ${modifiers} ${iconPrefix}${props.icon}`;

  const result = props.hasError ? `${baseClasses} has-error` : baseClasses;
  const isActive = props.active ? ' active' : '';
  return result + isActive;
});

const onClick = () => {
  emit('update:modelValue', !props.active);
};

</script>

<style lang="scss" scoped>
.g-button {
  font-weight: 500;
  position: relative;
  cursor: pointer;
  background-color: $color-primary-green;
  color: white;
  border: 0;
  border-radius: $border-radius-m;
  &--medium-wide {
    font-size: 1.4rem;
    padding: 1rem 2rem;
  }
  &--primary {
    background-color: $color-primary-blue;
    &:hover {
      background-color: transparentize($color-primary-blue, 0.2);
    }
    &:disabled {
      background-color: $color-gray-disabled;
      color: $color-gray-disabled-1;
      cursor: default;
    }
  }
  &--secondary {
    background-color: $color-secondary-error;
    color: white;
    &:hover {
      background-color: $color-secondary-error-hover;
      border-color: $color-secondary-error-hover;
    }
    &:disabled {
      background-color: $color-gray-disabled;
      color: $color-gray-disabled-1;
      cursor: default;
    }
  }
  &--tertiary {
    background-color: $color-primary-blue-transparent-header;
    color: $color-primary-black;
    &:hover {
      background-color: rgba($color-primary-blue-transparent-header, 0.03);
    }
    &:disabled {
      background-color: $color-gray-disabled;
      color: $color-gray-disabled-1;
      cursor: default;
    }
  }
}

</style>

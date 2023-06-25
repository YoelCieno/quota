<template>
  <button type="button"
          :disabled="disabled"
          :class="computedClasses"
          :title="tooltip"
          @click="onClick"
  >
    <span class="title">{{ title }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  classModifiers?: string[];
  disabled?: boolean;
  customPrefix?: boolean;
  active?: boolean;
  title?: string;
  tooltip?: string;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const defaultClassName = 'base-button';
const computedClasses = computed(() => {
  if (!props.classModifiers || !props.classModifiers.length) {
    return `${defaultClassName}`;
  }
  const modifiers = props.classModifiers.map((cm) => `${defaultClassName}--${cm}`).join(' ');

  return `${defaultClassName} ${modifiers}`;
});

const onClick = () => {
  emit('update:modelValue', !props.active);
};

</script>
<style lang="scss" scoped>
.base-button {
  font-weight: 500;
  position: relative;
  cursor: pointer;
  color: white;
  border: 0;
  border-radius: $border-radius-m;
  &--medium-wide {
    font-size: 14px;
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
      cursor: not-allowed;
    }
  }
  &--icon {
    color: $color-primary-blue-2;
    background-color: $color-primary-blue-1_3;
    border-radius: 100%;
    font-weight: bold;
    font-size: 20px;
    width: 25px;
    height: 25px;
    &:hover {
      background-color: transparentize($color-primary-blue-1_3, 0.1);
    }
    &:disabled {
      background-color: $color-gray-disabled;
      color: $color-gray-disabled-1;
      cursor: not-allowed;
    }
    &-less .title {
      vertical-align: top;
      line-height: 1;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { IdTextType } from '@/models';

const props = withDefaults(defineProps<{
  options: IdTextType[],
  default?: string,
  error?: boolean,
  placeholder?: string,
  tabindex?: number,
}>(), {
  placeholder: 'Select an option',
  tabindex: 0,
});
const emit = defineEmits<{
  (e: 'option', option: IdTextType): void,
  (e: 'input', selected?: string): void,
}>();

const selected = ref<string>();
const open = ref<boolean>();
const optionError = ref<boolean>();

const selectedText = computed(() => {
  const text = props.options?.find((op) => op.id === selected.value)?.text;
  return text;
});

/**
 * @param option 
 */
const onClickOption = (option: IdTextType) => {
  selected.value = option.id;
  open.value = false;

  emit('option', option);
};

const onClickSelected = () => {
  optionError.value = !props.options.length;
  if (!props.options.length) {
    return;
  }
  open.value = !open.value;
};

const onBlur = () => {
  open.value = false;
};

const clearSelected = () => {
  selected.value = undefined;
}

defineExpose({ clearSelected });
</script>
<template>
  <div class="select"
      :tabindex="tabindex"
      @blur="onBlur"
    >
    <div :class="['selected', { open: open, error: error && optionError }]"
         @click.prevent="onClickSelected">
      {{ selectedText ?? placeholder }}
    </div>
    <div :class="['select__options', { 'hide': !open }]">
      <div v-for="option of options"
           class="select__option"
           :key="option.id"
           @click="onClickOption(option)">
        {{ option.text }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  &__options {
    background-color: white;
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    border-right: 1px solid $color-gray-2;
    border-left: 1px solid $color-gray-2;
    border-bottom: 1px solid $color-gray-2;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    &.hide {
      display: none;
    }
  }
  &__option {
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: $color-primary-blue-1_3;
    }
  }
}
.selected {
    border-radius: 6px;
    border: 1px solid $color-gray-2;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
    &:after {
      position: absolute;
      content: "";
      top: 22px;
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: $color-primary-black transparent transparent transparent;
    }
    &.open {
      border: 1px solid;
      border-color:  $color-gray-2;
      border-radius: 6px 6px 0 0;
    }
    &.error {
      border-color: $color-error;
    }
  }
</style>

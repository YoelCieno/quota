<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import type { IdText } from './models';

const props = withDefaults(defineProps<{
  options: IdText[],
  default?: string,
  placeholder?: string,
  tabindex?: number,
}>(), {
  placeholder: 'Select an option',
  tabindex: 0,
});
const emit = defineEmits<{(e: 'input', option: IdText): void}>();

const selected = ref<string | null>();
const open = ref<boolean>();

const selectedText = computed(() => {
  const option = props.options?.find((op) => op.id === selected.value)?.text;
  return option;
});

onBeforeMount(() => {
  const currentDefault = props.default ? props.default : null;
  const currentDefaultOption = props.options.length === 1 ? props.options[0].id : null;

  selected.value = currentDefault ? currentDefault : currentDefaultOption;
})

/**
 * @param option 
 */
const onClickOption = (option: IdText) => {
  selected.value = option.id;
  open.value = false;
  emit('input', option);
};

const onClickSelected = () => {
  open.value = !open.value;
};

const onBlur = () => {
  open.value = false;
};

</script>
<template>
  <div class="select"
      :tabindex="tabindex"
      @blur="onBlur"
    >
    <div class="selected" :class="{ open: open }" @click.prevent="onClickSelected">
      {{ selectedText ?? placeholder }}
    </div>
    <div :class="['select__options', { select__hide: !open }]">
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
  &__hide {
    display: none;
  }
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
  }
  &__option {
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: $color-primary-blue-1_3;
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
      border: 1px solid $color-gray-2;
      border-radius: 6px 6px 0 0;
    }
  }
}
</style>

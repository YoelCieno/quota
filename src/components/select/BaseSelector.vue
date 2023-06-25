<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import type { IdText } from './models';

const props = withDefaults(defineProps<{
  options: IdText[],
  default?: string,
  tabindex?: number,
}>(), {
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
  const currentDefaultOption = props.options?.length ? props.options[0].id : null;
  selected.value = currentDefault ? currentDefault : currentDefaultOption;
})

const onClickOption = (option: IdText) => {
  selected.value = option.id;
  open.value = false;
  emit('input', option);
};

</script>
<template>
  <div class="custom-select"
      :tabindex="tabindex"
      @blur="open = false"
    >
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selectedText }}
    </div>
    <div :class="['items', { 'select-hide': !open }]">
      <div v-for="(option, i) of options"
           :key="i"
           @click="onClickOption(option)">
        {{ option.text }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  .selected {
    border-radius: 6px;
    border: 1px solid #666666;
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
      border: 1px solid #ad8225;
      border-radius: 6px 6px 0px 0px;
    }
  }
}

.custom-select .items {
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}
.custom-select .items div:hover {
  background-color: #ad8225;
}

.select-hide {
  display: none;
}
</style>

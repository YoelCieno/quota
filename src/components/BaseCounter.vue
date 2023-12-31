<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue';
import type { Action } from '@/models';

const props = withDefaults(defineProps<{
  defaultCount?: number,
  disabled?: boolean,
  max?: number,
  title?: string,
}>(), {
  defaultCount: 0,
  title: 'Counter Title',
})
const emit = defineEmits<{(e: 'change', count: number, action: Action): void }>();

const counter = ref(props.defaultCount);

const currentAction = (): Action => {
  if (props.defaultCount < counter.value) {
    return 'add';
  }
  if (props.defaultCount > counter.value) {
    return 'remove';
  }
  return null;
};

const onClickRemove = () => {
  if (counter.value > 0) {
    counter.value -= 1;
    emit('change', counter.value, currentAction());
  }
};

const onClickAdd = () => {
  if (props?.max && props.max > counter.value) {
    counter.value += 1;
  }
  emit('change', counter.value, currentAction());
};
</script>
<template>
  <div class="counter">
    <h3 class="counter__title">{{ title }}</h3>
    <div class="counter__box">
      <BaseButton title="-"
                  :class-modifiers="['icon', 'icon-less']"
                  :disabled="disabled"
                  @click="onClickRemove" />
      <span class="counter__number">{{ counter }}</span>
      <BaseButton title="+"
                  :class-modifiers="['icon']"
                  :disabled="disabled"
                  @click="onClickAdd" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.counter {
  background-color: $color-gray-1;
  text-align: center;
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 4px;
  padding: 0 1rem 1rem;
  &__box {
    border-radius: $border-radius-m;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 200px;
    padding: 1rem;
  }
  &__number {
    color: $color-primary-blue-2;
    font-size: 16.5px;
    font-weight: bold;
    padding-bottom: 2px;
    width: 10px;
  }
  &__title {
    color: $color-black;
    font-weight: 500;
    margin: 0.25rem 0;
  }
}
</style>

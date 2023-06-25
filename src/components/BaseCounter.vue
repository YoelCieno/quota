<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue';

withDefaults(defineProps<{
  title?: string,
}>(), {
  title: 'Counter Title'
})

const counter = ref(0);

const onClickLess = () => {
  if (counter.value > 0) {
    counter.value -= 1;
  }
};

const onClickAdd = () => {
  counter.value += 1;
};
</script>
<template>
  <div class="counter">
    <h3 class="counter__title">{{  title }}</h3>
    <div class="counter__box">
      <BaseButton title="-"
                  :class-modifiers="['icon', 'icon-less']"
                  @click="onClickLess" />
      <span class="counter__number">{{ counter }}</span>
      <BaseButton title="+"
                  :class-modifiers="['icon']"
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
    font-weight: bold;
  }
  &__title {
    color: $color-primary-black;
    font-weight: 500;
    margin: 0.25rem 0;
  }
}
</style>

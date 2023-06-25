<script setup lang="ts">
import BaseModal from '@/components/modal/BaseModal.vue';
import BaseSelector from '@/components/select/BaseSelector.vue';
import BaseButton from '@/components/BaseButton.vue';
import { onBeforeMount } from 'vue';
import useModal from '@/components/modal/useModal';
import { modalName } from '@/composables';
 
const { openModal, closeModal } = useModal();


onBeforeMount(() => {
  openModal(modalName);
})

const modalAction = () => {
  closeModal(modalName);
};

</script>
<template>
  <BaseModal title="Edit Flights"
             :modal-name="modalName">
    <template #body>
      <div class="quota__body">
        <label class="text-h6">Add or remove Flight from the subscriber</label>
        <div class="quota__form-row">
          <div class="quota__counter-box">
            aafdsf
          </div>
          <BaseSelector :options="[{ id: '0', text: 'test 1'}]"/>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="quota__footer">
        <BaseButton :class-modifiers="['medium-wide', 'primary']"
                 title="submitText"
                 @click="modalAction"
        />
      </div>
    </template>
  </BaseModal>
</template>
<style scoped lang="scss">
.quota {
  &__body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 1.5rem;
    width: 47.6rem;
    color: $color-primary-black;
    font-size: 15px;
    &--title {
      width: 47.6rem;
      color: $color-primary-black;
    }
  }
  &__form-row {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
  &__counter-box {
    background-color: $color-gray-1;
  }
  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 4rem 0;
    gap: 16px;
  }
}
</style>

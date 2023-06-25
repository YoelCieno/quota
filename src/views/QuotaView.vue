<script setup lang="ts">
import BaseModal from '@/components/modal/BaseModal.vue';
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
  <BaseModal :modal-name="modalName">
    <template #body>
      <div class="modal-body">
        <span class="modal-body--title text-h3 text-h3--medium">title</span>
        <span class="modal-body--content text-h6">content1</span>
        <span class="modal-body--content text-h6">content2</span>
      </div>
    </template>
    <template #footer>
      <div class="modal-footer">
        <BaseButton :class-modifiers="['medium-wide', 'primary']"
                 title="submitText"
                 @click="modalAction"
        />
      </div>
    </template>
  </BaseModal>
</template>
<style scoped lang="scss">
.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
  gap: 16px;
  padding: 0 4rem;

  &--title {
    width: 47.6rem;
    text-align: center;
    color: $color-primary-black;
  }

  &--content {
    width: 47.6rem;
    text-align: center;
    color: $color-primary-black;
  }
}
.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;
  gap: 16px;
}
</style>

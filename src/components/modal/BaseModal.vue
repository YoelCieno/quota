<script setup lang="ts">
import useModal from '@/components/modal/useModal';

const props = defineProps<{
  modalName: string,
  hideCloseCross?: boolean,
  title?: string,
}>();
const emit = defineEmits<{(e: 'close-cross'): void }>();

const { isModalOpen, closeModal } = useModal();

const onCloseCross = () => {
  emit('close-cross');
  closeModal(props.modalName);
};
</script>

<template>
  <div v-if="isModalOpen(modalName)">
    <div id="modal-overlay"
         class="modal-overlay"
    />
    <div id="modal"
         class="modal"
         role="dialog"
         aria-labelledby="modal-header"
         aria-describedby="modal-body"
    >
    <header class="modal__header">
      <h2 v-if="title"
          class="modal__h2">
        {{ title }}
      </h2>
      <span v-if="!hideCloseCross"
            class="close-button"
            aria-hidden="true"
            @click="onCloseCross"
      >x</span>
    </header>
      <section id="modal-body">
        <slot name="body">Body goes here ...</slot>
      </section>

      <footer>
        <slot name="footer">Footer goes here ...</slot>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.modal-overlay {
  z-index: $z-index-modal-overlay;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(49, 47, 66, 0.1);
}
.modal {
  z-index: $z-index-modal;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0 1rem 3rem rgba(54, 62, 87, 0.12);
  border-radius: $border-radius-m;
  &__header {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
  &__h2 {
    margin-left: 0.25rem;
  }

}
.close-button {
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1;
}
</style>

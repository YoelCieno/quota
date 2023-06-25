
<script setup lang="ts">
import useModal from '@/components/modal/useModal';

defineProps<{
  modalName: string,
  hideCloseCross?: boolean,
}>();

const { isModalOpen, closeModal } = useModal();
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
      <span v-if="!hideCloseCross"
            class="close-button icon-cross_big"
            aria-hidden="true"
            @click="closeModal(modalName)"
      >X</span>

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
  border-radius: $border-radius-xl;
}

.close-button {
  cursor: pointer;
  position: absolute;
  font-size: 1.4rem;
  font-weight: 500;
  top: 0.25rem;
  right: 1rem;
}
</style>

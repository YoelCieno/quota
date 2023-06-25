<script setup lang="ts">
import BaseModal from '@/components/modal/BaseModal.vue';
import BaseCounter from '@/components/BaseCounter.vue';
import BaseSelector from '@/components/select/BaseSelector.vue';
import BaseButton from '@/components/BaseButton.vue';
import { onBeforeMount, ref, computed } from 'vue';
import useModal from '@/components/modal/useModal';
import { modalName } from '@/composables';
import type { IdText } from '@/components/select/models';
 
const { openModal, closeModal } = useModal();


// https://mocki.io/v1/68dc88df-74c8-4c51-997a-253cd3109d16
const options = [{ id: '1', text: 'test 1'}, { id: '2', text: 'test 2'}];

const reason = ref<IdText>();
const initialQuota = ref(2);

const disabledCounter = computed(() => !reason.value);
const disabledSave = computed(() => !reason.value);

onBeforeMount(() => {
  openModal(modalName);
})

const onSaveChanges = () => {
  reason.value = undefined;
  closeModal(modalName);
};

/**
 * @param option
 */
const onInputReason = (option: IdText) => {
  reason.value = option;
};

const onCloseCross = () => {
  reason.value = undefined;
};

</script>
<template>
  <BaseModal title="Edit flights"
             :modal-name="modalName"
             @close-cross="onCloseCross">
    <template #body>
      <div class="quota__body">
        <label class="text-h6">Add or remove flights from the subscriber</label>
        <div class="quota__form-row">
         <BaseCounter title="Flight lefts"
                      :default-count="initialQuota"
                      :disabled="disabledCounter" />
          <BaseSelector placeholder="Select a reason"
                        :options="options"
                        @input="onInputReason" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="quota__footer">
        <BaseButton  title="SAVE CHANGES"
                     :class-modifiers="['medium-wide', 'primary']"
                     :disabled="disabledSave"
                     @click="onSaveChanges"
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
    grid-template-columns: 4fr 5fr;
    gap: 1rem;
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 3rem 0 2rem;
    gap: 16px;
  }
}
</style>

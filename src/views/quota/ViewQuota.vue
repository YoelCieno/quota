<script setup lang="ts">
import BaseModal from '@/components/modal/BaseModal.vue';
import BaseCounter from '@/components/BaseCounter.vue';
import BaseSelector from '@/components/BaseSelector.vue';
import BaseButton from '@/components/BaseButton.vue';
import { onBeforeMount, ref, computed } from 'vue';
import useModal from '@/components/modal/useModal';
import { modalName } from '@/composables';
import { useStoreQuota } from '@/stores';
import type { IdTextType, Action } from '@/models';
import { toast } from 'vue3-toastify';

const { openModal, closeModal } = useModal();
const storeQuota = useStoreQuota();

const reason = ref<IdTextType>();
const baseSelectorRef = ref<InstanceType< typeof BaseSelector>>();
const quotaOptions = ref<IdTextType[]>([]);
const editAction = ref<Action>();

const disabledSave = computed(() => !reason.value);
const selectorError = computed(() => !reason.value);


const initialQuota = 1;

onBeforeMount(async () => {
  openModal(modalName);
  /**
   * // INFO: get quota after open modal
   */
  await storeQuota.getQuotaReasons();
})

const clearQuota = () => {
  quotaOptions.value = [];
  reason.value = undefined;
  editAction.value = undefined;
  baseSelectorRef.value?.clearSelected();
}

const onSaveChanges = () => {
  closeModal(modalName);
  clearQuota();

  toast('Quota edited successfully!', { autoClose: 1250, type: 'success' }); 
};

/**
 * @param option
 */
const onInputOption = (option: IdTextType) => {
  reason.value = option;
};

const onCloseCross = () => {
  clearQuota();
};

const onChangeCounter = async (count: number, action: Action) => {
  if (editAction.value !== action) {
    reason.value = undefined;
    baseSelectorRef.value?.clearSelected();
  }
  editAction.value = action;

  if (count === initialQuota) {
    quotaOptions.value = [];
    return;
  }
  if (count > initialQuota) {
    quotaOptions.value = storeQuota.getAddOptions;
    return;
  }
  quotaOptions.value = storeQuota.getRemoveOptions;
};

</script>
<template>
  <BaseModal title="Edit flights"
             :modal-name="modalName"
             @close-cross="onCloseCross">
    <template #body>
      <div class="quota__body">
        <label class="text-h6">
          Add or remove flights from the subscriber
        </label>
        <div class="quota__form-row">
         <BaseCounter title="Flights lefts"
                      :max="3"
                      :default-count="initialQuota"
                      @change="onChangeCounter" />
          <BaseSelector placeholder="Select a reason"
                        ref="baseSelectorRef"
                        :options="quotaOptions"
                        :error="selectorError"
                        @option="onInputOption" />
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
    color: $color-black;
    font-size: 15px;
    &--title {
      width: 47.6rem;
      color: $color-black;
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

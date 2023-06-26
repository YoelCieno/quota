import { defineStore } from 'pinia';
import type { StateQuota } from './models';
import { mockiApi } from '@/apis';
import { quotaReasonsMock } from '@/views/quota/composables/quotaReasonsMock';

const initialState: StateQuota = {
  quotaOptions: []
};

export const useStoreQuota = defineStore({
  id: 'storeQuota',
  state: () => ({ ...initialState }),
  actions: {
    async getQuotaReasons() {
      const relativePath = '68dc88df-74c8-4c51-997a-253cd3109d16';
      const { data } = await mockiApi.get(relativePath);

      /**
       * // INFO: quotaReasonsMock only for develop
       */
      this.quotaOptions = data ?? quotaReasonsMock;
    }
  },
  getters: {
    //
  },
});

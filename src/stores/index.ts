import { createPinia } from 'pinia';
import { useStoreQuota } from './storeQuota';


const pinia = createPinia();

export {
  pinia,
  useStoreQuota,
}
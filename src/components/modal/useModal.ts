import { reactive, readonly } from 'vue';

interface UseModalReturn {
  state: Readonly<{ readonly modals: readonly string[] }>;
  isModalOpen: (modalName: string) => boolean;
  closeModal: (modalName: string) => void;
  openModal: (modalName: string) => void;
}

const state = reactive<{ modals: string[] }>({
  modals: [],
});

export default (): UseModalReturn => {
  const isModalOpen = (modalName: string): boolean => state.modals.includes(modalName);

  const closeModal = (modalName: string): void => {
    state.modals = state.modals.filter((m: string) => m !== modalName);
  };

  const openModal = (modalName: string): void => {
    if (isModalOpen(modalName)) return;
    state.modals.push(modalName);
  };

  return {
    state: readonly(state),
    isModalOpen,
    closeModal,
    openModal,
  };
};

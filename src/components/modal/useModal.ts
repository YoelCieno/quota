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
    console.log('%c [ modalName ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', modalName)
    console.log('%c [ state.modals ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', state.modals)
    state.modals = state.modals.filter((m: string) => m !== modalName);
    console.log('%c [ state.modals ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', state.modals)
  };

  const openModal = (modalName: string): void => {
    if (isModalOpen(modalName)) {
      return;
    }
    state.modals = [...state.modals, modalName];
  };

  return {
    state: readonly(state),
    isModalOpen,
    closeModal,
    openModal,
  };
};

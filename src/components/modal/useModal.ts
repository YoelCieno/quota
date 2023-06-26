import { reactive, readonly } from 'vue';

interface UseModalReturn {
  statusModal: Readonly<{ readonly modals: readonly string[] }>;
  isModalOpen: (modalName: string) => boolean;
  closeModal: (modalName: string) => void;
  openModal: (modalName: string) => void;
}

const statusModal = reactive<{ modals: string[] }>({
  modals: [],
});

export default (): UseModalReturn => {
  const isModalOpen = (modalName: string): boolean => statusModal.modals.includes(modalName);

  const closeModal = (modalName: string): void => {
    statusModal.modals = statusModal.modals.filter((m: string) => m !== modalName);
  };

  const openModal = (modalName: string): void => {
    if (isModalOpen(modalName)) {
      return;
    }
    statusModal.modals = [...statusModal.modals, modalName];
  };

  return {
    statusModal: readonly(statusModal),
    isModalOpen,
    closeModal,
    openModal,
  };
};

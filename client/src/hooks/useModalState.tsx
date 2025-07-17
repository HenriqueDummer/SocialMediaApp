import { useState } from "react";

export const useModalState = (onClose?: () => void) => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => setOpen(true);

  const closeModal = () => {
    setOpen(false);
    onClose?.();
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      onClose?.();
    }
  };

  return { open, openModal, closeModal, handleOpenChange };
};
import { create } from "zustand";

export const useConfirmStore = create((set, get) => ({
  message: "",
  isOpen: false,
  onConfirm: null,

  ask: (msg, onConfirm) => {
    set({ message: msg, isOpen: true, onConfirm });
  },

  confirm: () => {
    const { onConfirm } = get();
    if (onConfirm) onConfirm();
    get().close();
  },

  close: () => {
    set({ isOpen: false, message: "", onConfirm: null });
  },
}));

import { create } from "zustand";

export const useMessageStore = create((set, get) => ({
  message: "",
  isOpen: false,
  type: "success",

  showMessage: (msg, type = "success") => {
    set({ message: msg, isOpen: true, type });

    setTimeout(() => {
      get().hideMessage();
    }, 2000);
  },

  hideMessage: () => set({ isOpen: false, message: "" }),
}));

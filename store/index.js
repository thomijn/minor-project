import create from "zustand";

export const useStore = create((set) => ({
  menu: false,
  toggleMenu: (data) => set({ menu: data }),
}));

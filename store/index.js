import create from "zustand";

export const useStore = create((set) => ({
  menu: true,
  toggleMenu: (data) => set({ menu: data }),
}));

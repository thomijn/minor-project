import create from "zustand";

export const useStore = create((set) => ({
  menu: false,
  id: undefined,
  toggleMenu: (data) => set({ menu: data }),
  setId: (data) => set({ id: data }),
  filterOnHome: {
    phase: [],
    categories: [],
  },
  filterOnChallenges: {
    categories: [],
  },
  setFilterOnHome: (data) => set({ filterOnHome: data }),
  setFilterOnChallenges: (data) => set({ filterOnChallenges: data }),
}));

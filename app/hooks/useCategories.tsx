import { create } from 'zustand';

interface CategoriesStore {
  categories: Array<any>;
  setCategories: (categories: Array<any>) => void;
}

const useCategories = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

export default useCategories;
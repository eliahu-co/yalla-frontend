import { create } from 'zustand';

interface SearchParamsStore {
  category: string | null;
  dates: string | null;
  location: string | null;
  setCategory: (category: string | null) => void;
  setDates: (dates: string | null) => void;
  setLocation: (location: string | null) => void;
}

const useSearchParams = create<SearchParamsStore>((set) => ({
  category: null,
  dates: null,
  location: null,
  setCategory: (category) => set({ category }),
  setDates: (dates) => set({ dates }),
  setLocation: (location) => set({ location }),
}));

export default useSearchParams;
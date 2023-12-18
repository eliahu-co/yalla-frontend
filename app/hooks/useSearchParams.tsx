import { create } from 'zustand';

interface SearchParamsStore {
  category: string | null;
  startDate: string | null;
  endDate: string | null;
  location: any;
  setCategory: (category: string | null) => void;
  setStartDate: (dates: string | null) => void;
  setEndDate: (dates: string | null) => void;
  setLocation: (location: any) => void;
}


  

const useSearchParams = create<SearchParamsStore>((set) => ({
  category: null,
  startDate: null,
  endDate: null,
  location: null,
  setCategory: (category) => set({ category }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setLocation: (location) => set({ location }),
}));

export default useSearchParams;
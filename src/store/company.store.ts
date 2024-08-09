import { Company } from "@/entities";
import { create } from "zustand";
interface CompanyState {
  selected: Company | null;
  onSelect: (company: Company) => void;
}

export const useCompanyStore = create<CompanyState>()((set) => ({
  selected: null,
  onSelect: (company) => set({ selected: company }),
}));

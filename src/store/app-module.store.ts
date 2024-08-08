import { AppModuleWithFeatureModules } from "@/entities";
import { create } from "zustand";

interface AppModuleState {
  selected: AppModuleWithFeatureModules | null;
  onSelect: (appModule: AppModuleWithFeatureModules) => void;
}

export const useAppModuleStore = create<AppModuleState>()((set) => ({
  selected: null,
  onSelect: (appModule) => set({ selected: appModule }),
}));

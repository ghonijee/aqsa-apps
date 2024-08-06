export interface AppModuleTable {
  id?: number;
  name: string;
  defaultUrl: string;
  created_at: Date;
}

export type AppModule = Omit<AppModuleTable, "id">;
export type NewAppModule = Omit<AppModuleTable, "id" | "created_at">;
export type AppModuleWithFeatureModules = AppModule & {
  featureModules: FeatureModule[];
};

export interface FeatureModuleTable {
  id?: string;
  name: string;
  defaultUrl: string;
  appModuleId: number;
  created_at: Date;
}

export type FeatureModule = Omit<FeatureModuleTable, "id">;
export type NewFeatureModule = Omit<FeatureModuleTable, "id" | "created_at">;

export type GetListAppModulesParams = {
  page: number;
  pageSize: number;
  search?: string;
  orderBy?: "name" | "defaultUrl" | "created_at";
  orderDir?: "asc" | "desc";
};

export type ListAppModulesResult = {
  data: AppModuleWithFeatureModules[];
  totalData: number;
};

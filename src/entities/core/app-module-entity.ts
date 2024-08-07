export interface AppModuleTable {
  id?: number;
  name: string;
  defaultUrl: string;
  createdAt: Date;
}

export type AppModule = Omit<AppModuleTable, "id">;
export type NewAppModule = Omit<AppModuleTable, "id" | "created_at">;
export type AppModuleWithFeatureModules = AppModule & {
  featureModules: FeatureModule[] | null;
};

export interface FeatureModuleTable {
  id?: number;
  name: string;
  defaultUrl: string;
  appModuleId: number;
  createdAt: Date;
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

import {
  AppModuleTable,
  FeatureModuleTable,
} from "@/entities/core/app-module-entity";

export interface DatabaseTable {
  appModules: AppModuleTable;
  featureModules: FeatureModuleTable;
}

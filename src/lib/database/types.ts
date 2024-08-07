import {
  AppModuleTable,
  CompanyTable,
  FeatureModuleTable,
  UserTable,
} from "@/entities";

export interface DatabaseTable {
  appModules: AppModuleTable;
  featureModules: FeatureModuleTable;
  users: UserTable;
  companies: CompanyTable;
}

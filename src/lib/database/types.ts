import {
  AccountMutationTable,
  AppModuleTable,
  ChartOfAccountTable,
  CompanyTable,
  FeatureModuleTable,
  UserCompanyTable,
  UserTable,
} from "@/entities";

export interface DatabaseTable {
  appModules: AppModuleTable;
  featureModules: FeatureModuleTable;
  users: UserTable;
  companies: CompanyTable;
  userCompanies: UserCompanyTable;
  chartOfAccounts: ChartOfAccountTable;
  accountMutations: AccountMutationTable;
}

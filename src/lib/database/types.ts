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
  users: UserTable;
  companies: CompanyTable;
  userCompanies: UserCompanyTable;
  // appModules: AppModuleTable;
  // featureModules: FeatureModuleTable;
  // chartOfAccounts: ChartOfAccountTable;
  // accountMutations: AccountMutationTable;
}

export interface CompanyTable {
  id?: number;
  name: string;
  code?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  isActive: boolean;
  createdAt?: Date;
}

export type Company = CompanyTable;
export type NewCompany = Omit<Company, "id" | "created_at">;

export type ListCompanyResult = {
  data: Company[];
  totalData: number;
};

export type GetListCompaniesParams = {
  page: number;
  pageSize: number;
  search?: string;
  orderBy?: "name" | "code" | "created_at";
  orderDir?: "asc" | "desc";
};

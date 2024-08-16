export interface CompanyTable {
  id?: number;
  name: string;
  code?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city?: string | null | undefined;
  state?: string | null | undefined;
  isActive: boolean;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
  deletedAt?: Date | null | undefined;
}

export type Company = Omit<
  CompanyTable,
  "createdAt" | "deletedAt" | "updatedAt"
>;
export type NewCompany = Omit<
  Company,
  "id" | "createdAt" | "deletedAt" | "updatedAt"
>;

export type UpdateCompany = Partial<NewCompany>;

export type FindCompanyParams = {
  id?: number;
  code?: string;
  name?: string;
  isActive?: boolean;
};

export type ListCompanyResult = {
  data: Company[];
  totalData: number;
};

export type GetListCompaniesParams = {
  page: number;
  pageSize: number;
  search?: string;
  isActive?: boolean;
  orderBy?: "name" | "code" | "createdAt" | "isActive";
  orderDir?: "asc" | "desc";
};

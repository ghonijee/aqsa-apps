import { Company } from "./company.entity";

export interface UserTable {
  id?: number | undefined;
  name: string;
  email: string;
  username: string;
  password: string;
  isActive: boolean;
  image?: string | null | undefined;
  createdAt?: Date | null | undefined;
}

export type User = UserTable;
export type NewUser = Omit<UserTable, "id" | "createdAt">;

export type UserSession = Omit<
  UserTable,
  "password" | "isActive" | "createdAt"
> & { companies: Company[] };

export type ListUserResult = {
  data: User[];
  totalData: number;
};

export type GetListUsersParams = {
  page: number;
  pageSize: number;
  search?: string;
  isActive?: boolean;
  orderBy?: "name" | "email" | "username" | "createdAt";
  orderDir?: "asc" | "desc";
};

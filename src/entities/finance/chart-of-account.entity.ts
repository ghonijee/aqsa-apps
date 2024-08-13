import { z } from "zod";
import { PaginationParams, PaginationResult } from "../core";

export interface ChartOfAccountTable {
  id?: number;
  parentId: number | null;
  companyId: number;
  name: string;
  code: string;
  type?: string | null;
  isActive?: boolean | null;
  isManageable?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ChartOfAccount = Omit<
  ChartOfAccountTable,
  "createdAt" | "updatedAt"
>;

export type ChartOfAccountWithLevel = Omit<ChartOfAccount, "companyId"> & {
  level: number;
};

export type CreateChartOfAccount = Omit<
  ChartOfAccountTable,
  "id" | "createdAt" | "updatedAt"
>;
export type NewChartOfAccount = Omit<
  ChartOfAccountTable,
  "createdAt" | "updatedAt"
>;

export type UpdateChartOfAccount = Partial<NewChartOfAccount>;

export enum ChartOfAccountType {
  View = "View",
  Asset = "Asset",
  Liability = "Liability",
  Equity = "Equity",
  Income = "Income",
  Expense = "Expense",
}

export const ChartOfAccountOptions = Object.values(ChartOfAccountType);

export type ListChartOfAccountsResult = PaginationResult<ChartOfAccount>;

export type ListChartOfAccountParams = {
  search?: string;
  type?: string;
  companyCode: string;
} & PaginationParams;

import {
  ChartOfAccount,
  CreateChartOfAccount,
  ListChartOfAccountParams,
  UpdateChartOfAccount,
} from "@/entities";
import { chartOfAccountRepository } from "@/repositories/finance/chart-of-account-repository";
import { cache } from "react";

export const getListChartOfAccountsAction = cache(
  async (params: ListChartOfAccountParams) => {
    return chartOfAccountRepository.findAll(params);
  }
);

export const createChartOfAccountAction = async (
  data: CreateChartOfAccount
) => {
  return chartOfAccountRepository.create(data);
};

export const updateChartOfAccountAction = async (
  data: UpdateChartOfAccount
) => {
  return chartOfAccountRepository.update(data);
};

export const deleteChartOfAccountAction = async (id: number) => {
  return chartOfAccountRepository.delete(id);
};

export const getChartOfAccountByIdAction = async (id: number) => {
  return chartOfAccountRepository.findById(id);
};

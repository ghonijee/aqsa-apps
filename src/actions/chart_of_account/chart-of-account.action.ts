"use server";

import {
  CreateChartOfAccount,
  ListChartOfAccountParams,
  UpdateChartOfAccount,
} from "@/entities";
import { actionClient, authActionClient } from "@/lib/utils/safe-actions";
import { chartOfAccountRepository } from "@/repositories/finance/chart-of-account-repository";
import { flattenValidationErrors } from "next-safe-action";
import { cache } from "react";
import { newAccountSchema } from "@/schemas/chart-of-account.schema";
import { companyRepository } from "@/repositories/core/company-rpository";

export const getListChartOfAccountsAction = cache(
  async (params: ListChartOfAccountParams) => {
    return chartOfAccountRepository.findAll(params);
  }
);

export const createChartOfAccountAction = authActionClient
  .schema(newAccountSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({ parsedInput: { name, code, parent }, ctx: { companyCode } }) => {
      if (!companyCode) {
        throw new Error("Company Code not found!");
      }
      const company = await companyRepository.findByCompanyCode(companyCode);

      if (!company) {
        throw new Error("Company not found!");
      }
      const newAccount: CreateChartOfAccount = {
        name,
        code,
        companyId: company.id!,
        parentId: parent?.id ?? null,
        isManageable: true,
      };

      const result = await chartOfAccountRepository.create(newAccount);

      return {
        data: "result.insertId",
        error: "",
        message: "Account created successfully",
      };
    }
  );

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

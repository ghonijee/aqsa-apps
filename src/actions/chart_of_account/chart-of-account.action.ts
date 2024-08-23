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
import {
  findAccountSchema,
  newAccountSchema,
  updateAccountSchema,
} from "@/schemas/chart-of-account.schema";

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
  .action(async ({ parsedInput: { name, code, parent }, ctx: { company } }) => {
    const newAccount: CreateChartOfAccount = {
      name,
      code,
      companyId: company.id!,
      parentId: parent?.id ?? null,
      isManageable: true,
    };

    const result = await chartOfAccountRepository.create(newAccount);

    return {
      data: result.insertId,
      error: "",
      message: "Account created successfully",
    };
  });

export const updateChartOfAccountAction = authActionClient
  .schema(updateAccountSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id, name, code, parent, isActive } }) => {
    try {
      const newAccount: UpdateChartOfAccount = {
        id,
        name,
        code,
        parentId: parent?.id ?? null,
        isActive,
      };

      const result = await chartOfAccountRepository.update(newAccount);

      return {
        data: result.numChangedRows,
        error: "",
        message: "Account updated successfully",
      };
    } catch (error) {
      console.log(error);
    }
  });

export const deleteChartOfAccountAction = authActionClient
  .schema(findAccountSchema)
  .action(async ({ parsedInput: { id } }) => {
    const result = await chartOfAccountRepository.delete(id);

    return {
      data: result.numDeletedRows,
      error: "",
      message: "Account deleted successfully",
    };
  });

export const getChartOfAccountByIdAction = async (id: number) => {
  return chartOfAccountRepository.findById(id);
};

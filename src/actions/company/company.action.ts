"use server";

import { GetListCompaniesParams } from "@/entities";
import { authActionClient } from "@/lib/utils/safe-actions";
import { companyRepository } from "@/repositories/core/company-repository";
import {
  createCompanySchema,
  updateCompanySchema,
} from "@/schemas/company.schema";
import { flattenValidationErrors } from "next-safe-action";
import { NewCompany, UpdateCompany } from "../../entities/core/company.entity";
import { z } from "zod";

export const getListCompaniesByUserIdAction = (userId: string) => {
  const id = parseInt(userId);

  return companyRepository.findByUserId(id);
};

export const getAllCompaniesAction = ({
  ...params
}: GetListCompaniesParams) => {
  return companyRepository.findAll(params);
};

export const createCompanyAction = authActionClient
  .schema(createCompanySchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const newCompany: NewCompany = {
      name: parsedInput.name,
      code: parsedInput.code,
      address: parsedInput.address,
      isActive: parsedInput.isActive,
      email: parsedInput.email,
      phoneNumber: parsedInput.phoneNumber,
      city: parsedInput.city,
      state: parsedInput.state,
    };

    const result = await companyRepository.create(newCompany);

    return {
      data: {
        id: result.insertId,
        ...newCompany,
      },
      error: "",
      message: "Company created successfully",
    };
  });

export const updateCompanyAction = authActionClient
  .schema(updateCompanySchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const data: UpdateCompany = {
      name: parsedInput.name,
      code: parsedInput.code,
      address: parsedInput.address,
      isActive: parsedInput.isActive,
      email: parsedInput.email,
      phoneNumber: parsedInput.phoneNumber,
      city: parsedInput.city,
      state: parsedInput.state,
      updatedAt: new Date(),
    };

    await companyRepository.update(parsedInput.id, data);

    return {
      data: {
        ...data,
      },
      error: "",
      message: "Company updated successfully",
    };
  });

export const deleteCompanyAction = authActionClient
  .schema(
    z.object({
      id: z.number().or(z.array(z.number())),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    if (Array.isArray(parsedInput.id)) {
      await companyRepository.batchDelete(parsedInput.id);
    } else {
      await companyRepository.delete(parsedInput.id);
    }
    return {
      data: null,
      error: "",
      message: "Company deleted successfully",
    };
  });

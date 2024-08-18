import { GetListCompaniesParams } from "@/entities";
import { companyRepository } from "@/repositories/core/company-repository";

export const getListCompaniesByUserIdAction = (userId: string) => {
  const id = parseInt(userId);

  return companyRepository.findByUserId(id);
};

export const getAllCompaniesAction = ({
  ...params
}: GetListCompaniesParams) => {
  return companyRepository.findAll(params);
};

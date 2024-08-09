import { companyRepository } from "@/repositories/core/company-rpository";

const getListCompaniesByUserIdAction = (userId: string) => {
  const id = parseInt(userId);

  return companyRepository.findByUserId(id);
};

export default getListCompaniesByUserIdAction;

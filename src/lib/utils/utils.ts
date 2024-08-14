import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const countOffset = (page: number, pageSize: number) =>
  (Number(page) - 1) * Number(pageSize);

type GenerateMetaPaginationParams = {
  totalData: number;
  pageSize: number;
  currentPage?: number;
  lastId: number;
};

export const generateMetaPagination = ({
  totalData,
  pageSize,
  lastId,
  currentPage,
}: GenerateMetaPaginationParams): {
  totalData: number;
  currentPage: number;
  totalPage: number;
  limit: number;
  lastId: number;
} => {
  return {
    totalData,
    currentPage: currentPage || 1,
    totalPage: Math.ceil(totalData / pageSize),
    limit: pageSize,
    lastId,
  };
};

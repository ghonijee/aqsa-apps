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

export function isNullOrUndefined<T>(
  value: T | null | undefined
): value is null | undefined {
  return value === null || value === undefined;
}

export function isNotNullOrUndefined<T>(
  value: T | null | undefined
): value is T {
  return !isNullOrUndefined(value);
}

export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined;
}

export function isNull<T>(value: T | null): value is null {
  return value === null;
}

export function isNotNull<T>(value: T | null): value is T {
  return !isNull(value);
}

export function hasValue<T>(value: T): value is T {
  return value !== null && value !== undefined && value !== "";
}

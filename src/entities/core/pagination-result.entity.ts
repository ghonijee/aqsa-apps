export type MetaPagination = {
  totalData: number;
  currentPage: number;
  totalPage: number;
  limit: number;
  lastId: number;
};

export type PaginationResult<T> = {
  data: T[];
  metaData: MetaPagination;
};

export type PaginationParams = {
  page?: number;
  lastId?: number;
  pageSize: number;
};

export interface Pagination<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  rows: T[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export class PaginationService<T> implements Pagination<T> {
  private static PAGE_SIZE_DEFAULT = 10;

  constructor(
    readonly pageNum: number,
    readonly pageSize: number,
    readonly total: number,
    readonly rows: T[],
    readonly currentPage: number,
    readonly totalPages: number,
    readonly hasNextPage: boolean,
    readonly hasPrevPage: boolean,
  ) {}

  static create<T>(
    pageNum: number,
    pageSize: number,
    total: number,
    rows: T[],
  ) {
    const currentPage = pageNum;
    const totalPages = Math.ceil(total / pageSize);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    return new PaginationService<T>(
      pageNum,
      pageSize,
      total,
      rows,
      currentPage,
      totalPages,
      hasNextPage,
      hasPrevPage,
    );
  }
}

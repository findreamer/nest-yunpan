import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  private static PAGE_SIZE_DEFAULT = 10;

  @ApiProperty({ type: 'number', default: Pagination.PAGE_SIZE_DEFAULT })
  pageSize: number;

  @ApiProperty({ type: 'number', default: 1 })
  pageNum: number;

  @ApiProperty({ type: 'number', default: 0 })
  total: number;

  @ApiProperty({ type: 'array' })
  rows: T[];

  @ApiProperty({ type: 'number' })
  currentPage: number;

  @ApiProperty({ type: 'number' })
  totalPages: number;

  @ApiProperty({ type: 'boolean' })
  hasNextPage: boolean;
  @ApiProperty({ type: 'boolean' })
  hasPrevPage: boolean;

  constructor(
    pageNum: number,
    pageSize: number,
    total: number,
    rows: T[],
    currentPage: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
  ) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.total = total;
    this.rows = rows;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.hasNextPage = hasNextPage;
    this.hasPrevPage = hasPrevPage;
  }

  static create<T = any>(
    pageNum: number,
    pageSize: number,
    total: number,
    rows: T[],
  ) {
    const currentPage = pageNum;
    const totalPages = Math.ceil(total / pageSize);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    return new Pagination<T>(
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

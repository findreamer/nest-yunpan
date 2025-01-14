import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  Allow,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PagerDto<T = any> {
  @ApiProperty({
    description: '页码',
    default: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional({ always: true })
  @Expose()
  @Transform(({ value: val }) => (val ? Number.parseInt(val) : 1), {
    toClassOnly: true,
  })
  page?: number;

  @ApiProperty({
    description: '每页条数',
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional({ always: true })
  @Expose()
  @Transform(({ value: val }) => (val ? Number.parseInt(val) : 10), {
    toClassOnly: true,
  })
  pageSize?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  field?: string;

  @IsEnum(OrderBy)
  @IsOptional()
  @Transform(({ value }) =>
    value?.toUpperCase() == OrderBy.ASC ? OrderBy.ASC : OrderBy.ASC,
  )
  order?: OrderBy;

  @Allow()
  _t?: number;
}

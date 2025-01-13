import { CommonStatusEnum } from '@/common/entity/common.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateOrgDto {
  @ApiProperty({
    description: '租户id',
    type: Number,
    required: true,
  })
  tenantId: number;

  @ApiProperty({
    description: '上级id',
    type: Number,
    required: true,
  })
  superiorId: number;

  @ApiProperty({
    description: '组织类型编码',
    type: String,
    required: true,
  })
  @IsString()
  @Length(1, 10)
  orgTypeCode: string;

  @ApiProperty({
    description: '管理者id',
    type: Number,
    required: true,
  })
  @IsNumber()
  leaderId: number;

  @ApiProperty({
    description: '组织名称',
    type: String,
    required: true,
  })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiPropertyOptional({
    description: '组织状态',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsEnum(CommonStatusEnum)
  status: CommonStatusEnum;
}

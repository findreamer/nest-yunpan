import { CommonStatusEnum } from '@/common/entity/common.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({
    description: '租户名称',
    type: String,
    required: true,
  })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiPropertyOptional({
    description: '租户状态',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEnum(CommonStatusEnum)
  status?: CommonStatusEnum;
}

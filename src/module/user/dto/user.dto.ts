import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsEmail,
  isEmpty,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsString()
  @Matches(/^[\s\S]+$/)
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ description: '登录密码', example: 'a123456' })
  @IsOptional()
  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i, {
    message: '密码必须包含数字、字母，长度为6-16',
  })
  password: string;

  @ApiProperty({
    description: '归属角色',
    type: [Number],
  })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  roleIds: number[];

  @ApiProperty({
    description: '归属大区',
    type: Number,
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  deptId?: number;

  @ApiProperty({
    description: '昵称',
    example: 'admin',
  })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    description: '邮箱',
    example: 'abc.dev@qq.com',
  })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({
    description: '手机号',
    example: '13800138000',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ description: 'QQ' })
  @IsOptional()
  @IsString()
  @Matches(/^[1-9]\d{4,10}$/)
  @MinLength(5)
  @MaxLength(11)
  qq?: string;

  @ApiProperty({
    description: '头像',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  status: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserQueryDto extends IntersectionType()
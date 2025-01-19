import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class ImageCaptchaDto {
  @ApiProperty({
    type: Number,
    default: 100,
    description: '宽度',
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  readonly width: number = 100;
  

  @ApiProperty({
    type: Number,
    default: 50,
    description: '高度',
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  readonly height: number = 50;
}

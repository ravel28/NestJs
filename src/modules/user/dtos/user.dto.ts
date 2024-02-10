import { ApiProperty } from '@nestjs/swagger';
import { GenderType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsUUID()
  uniqueId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123@gmail.com',
    type: String,
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Anto',
    type: String,
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1$ampai9c0ba',
    type: String,
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(GenderType)
  @ApiProperty({
    example: [GenderType.PRIA, GenderType.WANITA],
    type: String,
    required: true,
  })
  gender: GenderType;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    example: [GenderType.PRIA, GenderType.WANITA],
    type: String,
    required: true,
  })
  educationLevelId: number;
}

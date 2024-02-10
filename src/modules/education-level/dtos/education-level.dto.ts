import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EducatiionLevelDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  uniqueId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Bootcamp',
    type: String,
    required: true,
  })
  level: string;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  // @IsString()
  // @IsOptional()
  // sorting?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 10, type: Number, required: true })
  take: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ example: 1, type: Number, required: true })
  page: number;

  // @IsOptional()
  // @ApiProperty({
  //   example: [OrderBy.ASC, OrderBy.DESC],
  //   enum: OrderBy,
  //   required: true,
  // })
  // orderBy?: string;

  @IsString()
  @IsOptional()
  filterBy?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '', type: String, required: false })
  keyword?: string;
}

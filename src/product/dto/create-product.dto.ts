import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


class DetailsDto {
  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  varietal?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  alcoholContent?: number;

  @IsOptional()
  @IsString()
  brewery?: string;

  @IsOptional()
  @IsString()
  volume?: string;

  @IsOptional()
  @IsString()
  brand?: string;
}


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => DetailsDto)
    details?: DetailsDto;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
}

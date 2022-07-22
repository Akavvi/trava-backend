import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterTripDto {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  minPrice: number;

  @IsNumber()
  @IsNotEmpty()
  maxPrice: number;
}

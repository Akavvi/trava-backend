import { ITripSearchParams } from '../interfaces/ITripSearchParams';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FindTripDto implements ITripSearchParams {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  limit: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  offset: number;

  @IsString()
  @IsOptional()
  name: string;
}

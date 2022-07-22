import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCheckpointDto } from '../../checkpoints/dto/create-checkpoint.dto';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly time: string;

  @ValidateNested()
  @Type(() => CreateCheckpointDto)
  @ArrayMinSize(3)
  readonly checkpoints: CreateCheckpointDto[];
}

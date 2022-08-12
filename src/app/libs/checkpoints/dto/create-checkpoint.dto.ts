import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsNumber,
} from 'class-validator';

export class CreateCheckpointDto {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsOptional()
  @Matches(new RegExp(/\.(jpeg|jpg|gif|png)$/))
  readonly imageUrl?: string;

  @IsNumber()
  @IsOptional()
  readonly price?: number;
}

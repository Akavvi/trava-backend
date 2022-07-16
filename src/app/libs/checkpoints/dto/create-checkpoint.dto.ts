import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCheckpointDto {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}

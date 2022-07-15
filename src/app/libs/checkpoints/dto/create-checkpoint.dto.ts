import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCheckpointDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

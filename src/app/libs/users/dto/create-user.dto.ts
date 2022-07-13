import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 16)
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @Length(4, 16)
  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly phone: string;
}

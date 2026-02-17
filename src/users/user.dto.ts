import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDTO {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  avatar: string;
}

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => CreateProfileDTO)
  @IsNotEmpty()
  profile: CreateProfileDTO;
}

export class UpateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;
}

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDTO, UpdateProfileDTO } from './profile.DTO';
import { PartialType, OmitType } from '@nestjs/mapped-types';

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

export class CreateUserWithoutProfileDTO extends OmitType(CreateUserDTO, [
  'profile',
]) {}

export class UpdateUserDTO extends PartialType(CreateUserWithoutProfileDTO) {
  @ValidateNested()
  @Type(() => UpdateProfileDTO)
  @IsOptional()
  profile: UpdateProfileDTO;
}

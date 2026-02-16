import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  id: string;
}

export class UpateUserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;
  id: string;
}

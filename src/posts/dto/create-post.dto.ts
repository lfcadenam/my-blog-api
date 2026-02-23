import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Titulo de la publicacoión.' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Contenido de la publicacoión.' })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Imagen de la publicacoión.' })
  coverImage?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'un resumen de la publicacoión.' })
  sumary?: string;

  /*@IsNumber()
  @IsNotEmpty()
  userId: number;*/

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ description: 'Categorías a las que pertenece la publicación' })
  categoryIds?: number[];
}

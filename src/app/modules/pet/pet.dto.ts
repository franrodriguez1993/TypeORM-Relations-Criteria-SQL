import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePetDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsNumber()
  userId: number;
}

export class UpdatePetDTO extends PartialType(CreatePetDTO) {}

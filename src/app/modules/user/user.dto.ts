import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class AddressDTO {
  @IsString()
  @IsNotEmpty()
  street_name: string;

  @IsString()
  @IsNotEmpty()
  street_number: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsNumber()
  @IsNotEmpty()
  dni: number;

  @IsNotEmpty()
  address: AddressDTO;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

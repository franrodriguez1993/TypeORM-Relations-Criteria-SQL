import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateGroupDTO extends PartialType(CreateGroupDTO) {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { PetEntity } from './entities/pet.entity';
import { GroupEntity } from './entities/group.entity';

const ENTITIES = [
  TypeOrmModule.forFeature([UserEntity]),
  TypeOrmModule.forFeature([AddressEntity]),
  TypeOrmModule.forFeature([PetEntity]),
  TypeOrmModule.forFeature([GroupEntity]),
];

@Module({ imports: ENTITIES, exports: ENTITIES })
export class EntitiesModule {}

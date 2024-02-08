import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';

const ENTITIES = [
  TypeOrmModule.forFeature([UserEntity]),
  TypeOrmModule.forFeature([AddressEntity]),
];

@Module({ imports: ENTITIES, exports: ENTITIES })
export class EntitiesModule {}

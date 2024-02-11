import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from './entities/user.entity';
import { AddressEntity } from './entities/address.entity';
import { PetEntity } from './entities/pet.entity';
import { GroupEntity } from './entities/group.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DDBB,
      entities: [UserEntity, AddressEntity, PetEntity, GroupEntity],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  exports: [],
})
export class MySQLClientModule {}

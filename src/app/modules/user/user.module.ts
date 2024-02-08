import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EntitiesModule } from 'src/app/database/entities.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EntitiesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

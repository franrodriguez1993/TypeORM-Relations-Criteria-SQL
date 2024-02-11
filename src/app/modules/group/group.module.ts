import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { EntitiesModule } from 'src/app/database/entities.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EntitiesModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}

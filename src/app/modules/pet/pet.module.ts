import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { ConfigModule } from '@nestjs/config';
import { EntitiesModule } from 'src/app/database/entities.module';

@Module({
  imports: [ConfigModule.forRoot(), EntitiesModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}

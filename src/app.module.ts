import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MySQLClientModule } from './app/database/MySQLClient.module';
import { UserModule } from './app/modules/user/user.module';
import { PetModule } from './app/modules/pet/pet.module';
import { GroupModule } from './app/modules/group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MySQLClientModule,
    UserModule,
    PetModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

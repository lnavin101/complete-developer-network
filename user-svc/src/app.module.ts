import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseProviders } from './providers/database.provider';
import { UserProviders } from './providers/user.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ...DatabaseProviders, ...UserProviders],
})
export class AppModule {}

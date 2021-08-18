import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseProviders } from './providers/database.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ...DatabaseProviders],
})
export class AppModule {}

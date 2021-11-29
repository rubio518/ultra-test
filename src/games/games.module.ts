import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from '../db/database.module';
import { gamesProviders } from './games.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [GamesController],
  providers: [...gamesProviders, GamesService],
  exports: [...gamesProviders],
})
export class GamesModule {}

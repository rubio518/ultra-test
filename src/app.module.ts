import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [GamesModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

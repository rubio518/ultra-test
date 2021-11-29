import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [GamesModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

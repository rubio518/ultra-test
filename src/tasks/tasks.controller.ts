import { Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/update_games')
  async updateGamesList() {
    const deleted = await this.tasksService.removeOldGames();
    const discounted = await this.tasksService.addPromotionToGames();
    return `deleted ${deleted} games \n discounted ${discounted} games`;
  }
}

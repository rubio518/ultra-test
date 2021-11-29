import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    const result = await this.gamesService.update(+id, updateGameDto);
    if (!result) {
      throw new HttpException(`Game not found`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }

  @Get(':id/publisher')
  getPublisher(@Param('id') id: string) {
    return this.gamesService.findPublisher(+id);
  }
}

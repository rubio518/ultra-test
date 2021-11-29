import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @Inject('GAMES_REPO')
    private gamesRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = new Game(createGameDto);
    return await this.gamesRepository.save(game);
  }

  async findAll() {
    return await this.gamesRepository.find();
  }

  async findOne(id: number) {
    return await this.gamesRepository.findOne(id);
  }

  async findPublisher(gameId: number) {
    return (await this.gamesRepository.findOne(gameId)).publisher;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const found = await this.gamesRepository.findOne(id);
    if (!found) {
      return;
    }
    const toUpdate = { ...found, ...updateGameDto };
    return await this.gamesRepository.save(toUpdate);
  }

  async remove(id: number) {
    return await this.gamesRepository.softDelete(id);
  }
}

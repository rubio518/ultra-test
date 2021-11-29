import { Inject, Injectable } from '@nestjs/common';
import { Game } from 'src/games/entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @Inject('GAMES_REPO')
    private gamesRepository: Repository<Game>,
  ) {}
  async removeOldGames() {
    const query = `UPDATE game SET deleted_at = CURRENT_TIMESTAMP where 
                  deleted_at IS NULL and 
                  release_date < current_timestamp - interval '18 month';`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, deleted] = await this.gamesRepository.query(query);
    return deleted;
  }

  async addPromotionToGames() {
    const query = `UPDATE game SET price = price*0.8, discounted_on = CURRENT_TIMESTAMP
    WHERE release_date < CURRENT_TIMESTAMP - INTERVAL '12 month' 
    AND release_date > CURRENT_TIMESTAMP - INTERVAL '18 month'
    AND discounted_on IS NULL
    AND deleted_at IS NULL`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, updated] = await this.gamesRepository.query(query);
    return updated;
  }
}

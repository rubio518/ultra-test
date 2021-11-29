import { Connection } from 'typeorm';
import { Game } from './entities/game.entity';

export const gamesProviders = [
  {
    provide: 'GAMES_REPO',
    useFactory: (connection: Connection) => connection.getRepository(Game),
    inject: ['DB_CONNECTION'],
  },
];

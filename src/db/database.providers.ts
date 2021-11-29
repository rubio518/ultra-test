import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DB_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'secret',
        database: 'ultra',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];

import { createConnection } from 'typeorm';
import { DB_CONFIG } from './config';

// @ts-ignore TS2769
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    // @ts-ignore TS2769
    useFactory: async () => await createConnection({
      type: DB_CONFIG.type,
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      username: DB_CONFIG.username,
      password: DB_CONFIG.password,
      database: DB_CONFIG.database,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];

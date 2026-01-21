import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';

export const POSTGRES_POOL = 'POSTGRES_POOL';

const postgresPoolProvider = {
  provide: POSTGRES_POOL,
  useFactory: () => {
    const connectionString =
      process.env.POSTGRES_URL ??
      'postgres://confast:confastpwd@localhost:5432/confast';

    return new Pool({
      connectionString,
      application_name: 'system-login',
    });
  },
};

@Global()
@Module({
  providers: [postgresPoolProvider],
  exports: [postgresPoolProvider],
})
export class PostgresModule {}

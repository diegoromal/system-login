import { Module } from '@nestjs/common';
import { userPrismaRepositoryProvider } from './user/user.prisma.repository.provider';
import { PostgresModule } from './postgres/postgres.module';
import { situatorEventPgRepositoryProvider } from './situator-event/situator-event.pg.repository.provider';

@Module({
  imports: [PostgresModule],
  providers: [userPrismaRepositoryProvider, situatorEventPgRepositoryProvider],
  exports: [userPrismaRepositoryProvider, situatorEventPgRepositoryProvider],
})
export class DatabaseModule {}

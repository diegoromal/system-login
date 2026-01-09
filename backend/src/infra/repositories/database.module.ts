import { Module } from '@nestjs/common';
import { userPrismaRepositoryProvider } from './user/user.prisma.repository.provider';

@Module({
  providers: [userPrismaRepositoryProvider],
  exports: [userPrismaRepositoryProvider],
})
export class DatabaseModule {}

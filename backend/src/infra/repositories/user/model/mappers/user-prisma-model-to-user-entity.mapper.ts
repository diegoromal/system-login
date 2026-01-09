import { User } from 'src/domain/entities/user.entity';
import type { UserPrismaModel } from '../user.prisma.model';

export class UserPrismaModelToUserEntityMapper {
  public static map(user: UserPrismaModel): User {
    const anUser = User.with({
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return anUser;
  }
}

import type { User } from 'src/domain/entities/user.entity';
import type { UserPrismaModel } from '../user.prisma.model';

export class UserEntityToUserPrismaModel {
  public static map(user: User): UserPrismaModel {
    const aMoldel: UserPrismaModel = {
      id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };

    return aMoldel;
  }
}

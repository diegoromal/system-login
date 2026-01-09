import { User } from 'src/domain/entities/user.entity';
import type { UserGateway } from 'src/domain/repositories/user.gateway';
import { UserNotFoundUsecaseException } from 'src/usecases/exceptions/user-not-fount.usecase.exception';
import { FindUserUsecase } from './find-user.usecase';

describe('Usecases > User > FindUserUsecase', () => {
  const userGateway = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  const makeSut = () => new FindUserUsecase(userGateway as unknown as UserGateway);

  beforeEach(() => jest.clearAllMocks());

  it('should return user data when user exists', async () => {
    const persistedUser = User.create({
      email: 'john@doe.com',
      password: '12345678',
    });
    userGateway.findById.mockResolvedValue(persistedUser);

    const sut = makeSut();
    const output = await sut.execute({ id: persistedUser.getId() });

    expect(userGateway.findById).toHaveBeenCalledWith(persistedUser.getId());
    expect(output).toEqual({
      id: persistedUser.getId(),
      email: persistedUser.getEmail(),
      createdAt: persistedUser.getCreatedAt(),
      updatedAt: persistedUser.getUpdatedAt(),
    });
  });

  it('should throw when user is not found', async () => {
    const sut = makeSut();
    const userId = 'non-existent-id';
    userGateway.findById.mockResolvedValue(null);

    await expect(sut.execute({ id: userId })).rejects.toBeInstanceOf(
      UserNotFoundUsecaseException,
    );
    expect(userGateway.findById).toHaveBeenCalledWith(userId);
  });
});

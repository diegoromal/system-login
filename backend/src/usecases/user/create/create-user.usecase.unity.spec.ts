import { User } from 'src/domain/entities/user.entity';
import type { UserGateway } from 'src/domain/repositories/user.gateway';
import { EmailAlreadyExistsUsecaseException } from 'src/usecases/exceptions/email-already-exists.usecase.exception';
import { CreateUserUsecase } from './create-user.usecase';

describe('Usecases > User > CreateUserUsecase', () => {
  const userGateway = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  const makeSut = () =>
    new CreateUserUsecase(userGateway as unknown as UserGateway);

  const input = { email: 'john@doe.com', password: '12345678' };

  beforeEach(() => jest.clearAllMocks());

  it('should create a user when email is available', async () => {
    userGateway.findByEmail.mockResolvedValue(null);
    userGateway.create.mockResolvedValue(undefined);

    const sut = makeSut();
    const result = await sut.execute(input);

    expect(userGateway.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userGateway.create).toHaveBeenCalledTimes(1);

    const persistedUser = userGateway.create.mock.calls[0][0];
    expect(persistedUser).toBeInstanceOf(User);
    expect(persistedUser.getEmail()).toBe(input.email);
    expect(persistedUser.comparePassword(input.password)).toBe(true);
    expect(result).toEqual({ id: persistedUser.getId() });
  });

  it('should throw when email already exists', async () => {
    const existingUser = User.create(input);
    userGateway.findByEmail.mockResolvedValue(existingUser);

    const sut = makeSut();

    await expect(sut.execute(input)).rejects.toBeInstanceOf(
      EmailAlreadyExistsUsecaseException,
    );
    expect(userGateway.create).not.toHaveBeenCalled();
  });
});

import { User } from 'src/domain/entities/user.entity';
import type { UserGateway } from 'src/domain/repositories/user.gateway';
import type { JwtService } from 'src/infra/services/jwt/jwt.service';
import { CredentialsNotValidUsecaseException } from 'src/usecases/exceptions/credentials-not-valid.usecase.exception';
import { LoginUserUsecase } from './login-user.usecase';

describe('Usecases > User > LoginUserUsecase', () => {
  const userGateway = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  const jwtService: jest.Mocked<JwtService> = {
    generateAuthToken: jest.fn(),
    generateRefreshToken: jest.fn(),
    generateAuthTokenWithRefreshToken: jest.fn(),
    verifyAuthToken: jest.fn(),
  };

  const makeSut = () =>
    new LoginUserUsecase(
      userGateway as unknown as UserGateway,
      jwtService as unknown as JwtService,
    );

  const input = { email: 'john@doe.com', password: '12345678' };

  beforeEach(() => jest.clearAllMocks());

  it('should return tokens when credentials are valid', async () => {
    const persistedUser = User.create(input);
    userGateway.findByEmail.mockResolvedValue(persistedUser);
    jwtService.generateAuthToken.mockReturnValue('any-auth-token');
    jwtService.generateRefreshToken.mockReturnValue('any-refresh-token');

    const sut = makeSut();
    const result = await sut.execute(input);

    expect(userGateway.findByEmail).toHaveBeenCalledWith(input.email);
    expect(jwtService.generateAuthToken).toHaveBeenCalledWith(
      persistedUser.getId(),
    );
    expect(jwtService.generateRefreshToken).toHaveBeenCalledWith(
      persistedUser.getId(),
    );
    expect(result).toEqual({
      authToken: 'any-auth-token',
      refreshToken: 'any-refresh-token',
    });
  });

  it('should throw when user is not found', async () => {
    userGateway.findByEmail.mockResolvedValue(null);

    const sut = makeSut();

    await expect(sut.execute(input)).rejects.toBeInstanceOf(
      CredentialsNotValidUsecaseException,
    );
    expect(jwtService.generateAuthToken).not.toHaveBeenCalled();
    expect(jwtService.generateRefreshToken).not.toHaveBeenCalled();
  });

  it('should throw when password does not match', async () => {
    const persistedUser = User.create(input);
    userGateway.findByEmail.mockResolvedValue(persistedUser);

    const sut = makeSut();

    await expect(
      sut.execute({ email: input.email, password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(CredentialsNotValidUsecaseException);
    expect(jwtService.generateAuthToken).not.toHaveBeenCalled();
    expect(jwtService.generateRefreshToken).not.toHaveBeenCalled();
  });
});

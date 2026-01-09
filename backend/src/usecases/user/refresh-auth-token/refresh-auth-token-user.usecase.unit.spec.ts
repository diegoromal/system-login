import { User } from 'src/domain/entities/user.entity';
import type { UserGateway } from 'src/domain/repositories/user.gateway';
import type { JwtService } from 'src/infra/services/jwt/jwt.service';
import { CredentialsNotValidUsecaseException } from 'src/usecases/exceptions/credentials-not-valid.usecase.exception';
import { RefreshAuthTokenUserUsecase } from './refresh-auth-token-user.usecase';

describe('Usecases > User > RefreshAuthTokenUserUsecase', () => {
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
    new RefreshAuthTokenUserUsecase(
      userGateway as unknown as UserGateway,
      jwtService as unknown as JwtService,
    );

  const input = { refreshToken: 'any-refresh-token' };

  beforeEach(() => jest.clearAllMocks());

  it('should return auth token when refresh token is valid and user exists', async () => {
    const persistedUser = User.create({
      email: 'john@doe.com',
      password: '12345678',
    });
    jwtService.generateAuthTokenWithRefreshToken.mockReturnValue({
      authToken: 'new-auth-token',
      userId: 'any-user-id',
    });
    userGateway.findById.mockResolvedValue(persistedUser);

    const sut = makeSut();
    const output = await sut.execute(input);

    expect(jwtService.generateAuthTokenWithRefreshToken).toHaveBeenCalledWith(
      input.refreshToken,
    );
    expect(userGateway.findById).toHaveBeenCalledWith('any-user-id');
    expect(output).toEqual({ authToken: 'new-auth-token' });
  });

  it('should throw when user is not found', async () => {
    jwtService.generateAuthTokenWithRefreshToken.mockReturnValue({
      authToken: 'any-auth-token',
      userId: 'non-existent-id',
    });
    userGateway.findById.mockResolvedValue(null);

    const sut = makeSut();

    await expect(sut.execute(input)).rejects.toBeInstanceOf(
      CredentialsNotValidUsecaseException,
    );
    expect(jwtService.generateAuthTokenWithRefreshToken).toHaveBeenCalledWith(
      input.refreshToken,
    );
    expect(userGateway.findById).toHaveBeenCalledWith('non-existent-id');
  });
});

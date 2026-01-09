import type { RefreshAuthTokenUserUsecaseOutput } from 'src/usecases/user/refresh-auth-token/refresh-auth-token-user.usecase';
import type { RefreshAuthTokenUserResponse } from './refresh-auth-token-user.route';

export class RefreshAuthTokenUserPresenter {
  public static toHttp(
    input: RefreshAuthTokenUserUsecaseOutput,
  ): RefreshAuthTokenUserResponse {
    const response: RefreshAuthTokenUserResponse = {
      authToken: input.authToken,
    };

    return response;
  }
}

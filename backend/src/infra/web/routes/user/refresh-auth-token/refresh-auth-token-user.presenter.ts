import { Body, Controller, Post } from '@nestjs/common';
import {
  RefreshAuthTokenUserUsecase,
  type RefreshAuthTokenUserUsecaseInput,
} from 'src/usecases/user/refresh-auth-token/refresh-auth-token-user.usecase';
import type {
  RefreshAuthTokenUserRequest,
  RefreshAuthTokenUserResponse,
} from './refresh-auth-token-user.route';
import { RefreshAuthTokenUserPresenter } from './refresh-auth-token-user.dto';
import { IsPublic } from 'src/infra/web/auth/decorators/is-public.decorator';

@Controller('users')
export class RefreshAuthTokenUserRoute {
  public constructor(
    private readonly refreshAuthTokenUserUsecase: RefreshAuthTokenUserUsecase,
  ) {}

  @IsPublic()
  @Post('refresh')
  public async handle(
    @Body() request: RefreshAuthTokenUserRequest,
  ): Promise<RefreshAuthTokenUserResponse> {
    const input: RefreshAuthTokenUserUsecaseInput = {
      refreshToken: request.refreshToken,
    };

    const result = await this.refreshAuthTokenUserUsecase.execute(input);

    const response = RefreshAuthTokenUserPresenter.toHttp(result);

    return response;
  }
}

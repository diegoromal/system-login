import { Controller, Get } from '@nestjs/common';
import { UserId } from 'src/infra/web/auth/decorators/user-id.decorator';
import {
  FindUserInput,
  FindUserUsecase,
} from 'src/usecases/user/find-by-id/find-user.usecase';
import { FindByIdUserResponse } from './find-by-id-user.dto';
import { FindByIdUserPresenter } from './find-by-id-user.presenter';

@Controller('users')
export class FindByIdUserRoute {
  constructor(private readonly findUserUsecase: FindUserUsecase) {}

  @Get('me')
  public async handle(@UserId() userId: string): Promise<FindByIdUserResponse> {
    const input: FindUserInput = {
      id: userId,
    };

    const output = await this.findUserUsecase.execute(input);

    const response = FindByIdUserPresenter.toHttp(output);

    return response;
  }
}

import { Module } from '@nestjs/common';
import { CreateUserUsecase } from './user/create/create-user.usecase';
import { FindUserUsecase } from './user/find-by-id/find-user.usecase';
import { LoginUserUsecase } from './user/login/login-user.usecase';
import { RefreshAuthTokenUserUsecase } from './user/refresh-auth-token/refresh-auth-token-user.usecase';
import { DatabaseModule } from 'src/infra/repositories/database.module';
import { ServiceModule } from 'src/infra/services/service.module';
import { ListSituatorEventUsecase } from './situator-event/list/list-situator-event.usecase';
import { UpdateSituatorEventUsecase } from './situator-event/update/update-situator-event.usecase';

@Module({
  imports: [DatabaseModule, ServiceModule],
  providers: [
    CreateUserUsecase,
    FindUserUsecase,
    LoginUserUsecase,
    RefreshAuthTokenUserUsecase,
    ListSituatorEventUsecase,
    UpdateSituatorEventUsecase,
  ],
  exports: [
    CreateUserUsecase,
    FindUserUsecase,
    LoginUserUsecase,
    RefreshAuthTokenUserUsecase,
    ListSituatorEventUsecase,
    UpdateSituatorEventUsecase,
  ],
})
export class UsecaseModule {}

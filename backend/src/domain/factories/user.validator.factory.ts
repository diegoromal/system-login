import type { User } from '../entities/user.entity';
import type { Validator } from '../shared/validators/validator';
import { UserZodValidator } from '../validators/user.zod.validator';

export class UserValidatorFactory {
  public static create(): Validator<User> {
    return UserZodValidator.create();
  }
}

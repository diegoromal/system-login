import { SituatorEventZodValidator } from '../validators/situator-event.zod.validator';
import { Validator } from '../shared/validators/validator';
import { SituatorEvent } from '../entities/situator-event.entity';

export class SituatorEventValidatorFactory {
  private constructor() {}

  public static create(): Validator<SituatorEvent> {
    return SituatorEventZodValidator.create();
  }
}

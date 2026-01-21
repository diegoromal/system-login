import z from 'zod';
import { DomainException } from 'src/domain/shared/exceptions/domain.exception';
import { ValidatorDomainException } from 'src/domain/shared/exceptions/validator-domain.exception';
import type { Validator } from 'src/domain/shared/validators/validator';
import type { SituatorEvent } from '../entities/situator-event.entity';
import { ZodUtils } from 'src/shared/utils/zod-utils';

export class SituatorEventZodValidator implements Validator<SituatorEvent> {
  private constructor() {}

  public static create(): SituatorEventZodValidator {
    return new SituatorEventZodValidator();
  }

  public validate(input: SituatorEvent): void {
    try {
      this.getZodSchema().parse({
        id: input.getId(),
        srcextension: input.getSrcextension(),
        situatoraccountcode: input.getSituatoraccountcode(),
        situatorzonecode: input.getSituatorzonecode(),
        situatoreventcode: input.getSituatoreventcode(),
        situatorpriority: input.getSituatorpriority(),
        situatorcondominium: input.getSituatorcondominium(),
        createdAt: input.getCreatedAt(),
        updatedAt: input.getUpdatedAt(),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = ZodUtils.formatZodError(error);
        throw new ValidatorDomainException(
          `Error while validating situator event ${input.getId()}: ${message}`,
          `Os dados do evento são inválidos: ${message}`,
          SituatorEventZodValidator.name,
        );
      }

      const err = error as Error;

      throw new DomainException(
        `Error while validating situator event ${input.getId()}: ${err.message}`,
        `Houve um erro inesperado ao validar o evento`,
        SituatorEventZodValidator.name,
      );
    }
  }

  private getZodSchema() {
    return z.object({
      id: z.string(),
      srcextension: z.string().min(1).max(10),
      situatoraccountcode: z.string().min(1).max(10),
      situatorzonecode: z.string().min(1).max(10),
      situatoreventcode: z.string().min(1).max(10),
      situatorpriority: z.string().min(1).max(10),
      situatorcondominium: z.string().min(1).max(100),
      createdAt: z.date(),
      updatedAt: z.date(),
    });
  }
}

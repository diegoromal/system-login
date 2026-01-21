import { Inject, Injectable } from '@nestjs/common';
import type { SituatorEventGateway } from 'src/domain/repositories/situator-event.gateway';
import type { Usecase } from 'src/usecases/usecase';
import { UsecaseException } from 'src/usecases/exceptions/usecase.exception';
import { SITUATOR_EVENT_GATEWAY } from 'src/infra/repositories/situator-event/situator-event.pg.repository.provider';

export type UpdateSituatorEventInput = {
  id: string;
  srcextension: string;
  situatoraccountcode: string;
  situatorzonecode: string;
  situatoreventcode: string;
  situatorpriority: string;
  situatorcondominium: string;
};

export type UpdateSituatorEventOutput = {
  id: string;
  srcextension: string;
  situatoraccountcode: string;
  situatorzonecode: string;
  situatoreventcode: string;
  situatorpriority: string;
  situatorcondominium: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UpdateSituatorEventUsecase implements Usecase<
  UpdateSituatorEventInput,
  UpdateSituatorEventOutput
> {
  public constructor(
    @Inject(SITUATOR_EVENT_GATEWAY)
    private readonly situatorEventGateway: SituatorEventGateway,
  ) {}

  public async execute(
    input: UpdateSituatorEventInput,
  ): Promise<UpdateSituatorEventOutput> {
    try {
      const updated = await this.situatorEventGateway.update(input.id, {
        srcextension: input.srcextension,
        situatoraccountcode: input.situatoraccountcode,
        situatorzonecode: input.situatorzonecode,
        situatoreventcode: input.situatoreventcode,
        situatorpriority: input.situatorpriority,
        situatorcondominium: input.situatorcondominium,
      });

      return {
        id: updated.getId(),
        srcextension: updated.getSrcextension(),
        situatoraccountcode: updated.getSituatoraccountcode(),
        situatorzonecode: updated.getSituatorzonecode(),
        situatoreventcode: updated.getSituatoreventcode(),
        situatorpriority: updated.getSituatorpriority(),
        situatorcondominium: updated.getSituatorcondominium(),
        createdAt: updated.getCreatedAt(),
        updatedAt: updated.getUpdatedAt(),
      };
    } catch (error) {
      const err = error as Error;
      throw new UsecaseException(
        `Error while updating situator event ${input.id}: ${err.message}`,
        `Não foi possível atualizar o evento.`,
        UpdateSituatorEventUsecase.name,
      );
    }
  }
}

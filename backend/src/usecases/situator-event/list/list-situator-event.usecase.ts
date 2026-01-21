import { Inject, Injectable } from '@nestjs/common';
import type { SituatorEventGateway } from 'src/domain/repositories/situator-event.gateway';
import type { Usecase } from 'src/usecases/usecase';
import { UsecaseException } from 'src/usecases/exceptions/usecase.exception';
import { SITUATOR_EVENT_GATEWAY } from 'src/infra/repositories/situator-event/situator-event.pg.repository.provider';

export type ListSituatorEventOutput = {
  id: string;
  srcextension: string;
  situatoraccountcode: string;
  situatorzonecode: string;
  situatoreventcode: string;
  situatorpriority: string;
  situatorcondominium: string;
  createdAt: Date;
  updatedAt: Date;
}[];

@Injectable()
export class ListSituatorEventUsecase implements Usecase<
  void,
  ListSituatorEventOutput
> {
  public constructor(
    @Inject(SITUATOR_EVENT_GATEWAY)
    private readonly situatorEventGateway: SituatorEventGateway,
  ) {}

  public async execute(): Promise<ListSituatorEventOutput> {
    try {
      const items = await this.situatorEventGateway.listAll();

      return items.map((item) => ({
        id: item.getId(),
        srcextension: item.getSrcextension(),
        situatoraccountcode: item.getSituatoraccountcode(),
        situatorzonecode: item.getSituatorzonecode(),
        situatoreventcode: item.getSituatoreventcode(),
        situatorpriority: item.getSituatorpriority(),
        situatorcondominium: item.getSituatorcondominium(),
        createdAt: item.getCreatedAt(),
        updatedAt: item.getUpdatedAt(),
      }));
    } catch (error) {
      const err = error as Error;
      throw new UsecaseException(
        `Error while listing situator events: ${err.message}`,
        `Não foi possível listar os eventos do Situator.`,
        ListSituatorEventUsecase.name,
      );
    }
  }
}

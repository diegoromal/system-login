import type { ListSituatorEventOutput } from 'src/usecases/situator-event/list/list-situator-event.usecase';
import type { UpdateSituatorEventOutput } from 'src/usecases/situator-event/update/update-situator-event.usecase';
import type { SituatorEventResponse } from './situator-event.dto';

export class SituatorEventPresenter {
  public static toHttp(
    input: ListSituatorEventOutput[number] | UpdateSituatorEventOutput,
  ): SituatorEventResponse {
    return {
      id: input.id,
      srcextension: input.srcextension,
      situatoraccountcode: input.situatoraccountcode,
      situatorzonecode: input.situatorzonecode,
      situatoreventcode: input.situatoreventcode,
      situatorpriority: input.situatorpriority,
      situatorcondominium: input.situatorcondominium,
    };
  }
}

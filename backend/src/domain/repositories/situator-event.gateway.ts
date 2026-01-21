import { SituatorEvent } from '../entities/situator-event.entity';

export interface SituatorEventGateway {
  listAll(): Promise<SituatorEvent[]>;
  update(
    id: string,
    input: {
      srcextension: string;
      situatoraccountcode: string;
      situatorzonecode: string;
      situatoreventcode: string;
      situatorpriority: string;
      situatorcondominium: string;
    },
  ): Promise<SituatorEvent>;
}

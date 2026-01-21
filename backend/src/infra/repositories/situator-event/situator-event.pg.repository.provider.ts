import { SituatorEventPgRepository } from './situator-event.pg.repository';
import { SituatorEventGateway } from 'src/domain/repositories/situator-event.gateway';

export const SITUATOR_EVENT_GATEWAY = 'SITUATOR_EVENT_GATEWAY';

export const situatorEventPgRepositoryProvider = {
  provide: SITUATOR_EVENT_GATEWAY,
  useClass: SituatorEventPgRepository,
};

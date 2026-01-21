import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import {
  ListSituatorEventUsecase,
  type ListSituatorEventOutput,
} from 'src/usecases/situator-event/list/list-situator-event.usecase';
import {
  UpdateSituatorEventUsecase,
  type UpdateSituatorEventInput,
} from 'src/usecases/situator-event/update/update-situator-event.usecase';
import {
  SituatorEventResponse,
  type UpdateSituatorEventRequest,
} from './situator-event.dto';
import { SituatorEventPresenter } from './situator-event.presenter';

@Controller('asterisk/situator-events')
export class SituatorEventsRoute {
  public constructor(
    private readonly listSituatorEventUsecase: ListSituatorEventUsecase,
    private readonly updateSituatorEventUsecase: UpdateSituatorEventUsecase,
  ) {}

  @Get()
  public async list(): Promise<SituatorEventResponse[]> {
    const output: ListSituatorEventOutput =
      await this.listSituatorEventUsecase.execute();

    return output.map((item) => SituatorEventPresenter.toHttp(item));
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateSituatorEventRequest,
  ): Promise<SituatorEventResponse> {
    const input: UpdateSituatorEventInput = {
      id,
      srcextension: body.srcextension,
      situatoraccountcode: body.situatoraccountcode,
      situatorzonecode: body.situatorzonecode,
      situatoreventcode: body.situatoreventcode,
      situatorpriority: body.situatorpriority,
      situatorcondominium: body.situatorcondominium,
    };

    const output = await this.updateSituatorEventUsecase.execute(input);

    return SituatorEventPresenter.toHttp(output);
  }
}

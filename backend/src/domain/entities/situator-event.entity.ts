import { Entity } from 'src/domain/shared/entities/entity';
import { SituatorEventValidatorFactory } from '../factories/situator-event.validator.factory';

export type SituatorEventCreateDto = {
  srcextension: string;
  situatoraccountcode: string;
  situatorzonecode: string;
  situatoreventcode: string;
  situatorpriority: string;
  situatorcondominium: string;
};

export type SituatorEventWithDto = SituatorEventCreateDto & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export class SituatorEvent extends Entity {
  private constructor(
    id: string,
    private srcextension: string,
    private situatoraccountcode: string,
    private situatorzonecode: string,
    private situatoreventcode: string,
    private situatorpriority: string,
    private situatorcondominium: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.validate();
  }

  public static with(dto: SituatorEventWithDto): SituatorEvent {
    return new SituatorEvent(
      dto.id,
      dto.srcextension,
      dto.situatoraccountcode,
      dto.situatorzonecode,
      dto.situatoreventcode,
      dto.situatorpriority,
      dto.situatorcondominium,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  protected validate(): void {
    SituatorEventValidatorFactory.create().validate(this);
  }

  public getSrcextension(): string {
    return this.srcextension;
  }

  public getSituatoraccountcode(): string {
    return this.situatoraccountcode;
  }

  public getSituatorzonecode(): string {
    return this.situatorzonecode;
  }

  public getSituatoreventcode(): string {
    return this.situatoreventcode;
  }

  public getSituatorpriority(): string {
    return this.situatorpriority;
  }

  public getSituatorcondominium(): string {
    return this.situatorcondominium;
  }

  public update(data: SituatorEventCreateDto): void {
    this.srcextension = data.srcextension;
    this.situatoraccountcode = data.situatoraccountcode;
    this.situatorzonecode = data.situatorzonecode;
    this.situatoreventcode = data.situatoreventcode;
    this.situatorpriority = data.situatorpriority;
    this.situatorcondominium = data.situatorcondominium;
    this.hasUpdated();
    this.validate();
  }
}

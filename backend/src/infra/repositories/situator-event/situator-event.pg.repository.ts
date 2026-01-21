import { Inject, Injectable } from '@nestjs/common';
import type { SituatorEventGateway } from 'src/domain/repositories/situator-event.gateway';
import { POSTGRES_POOL } from '../postgres/postgres.module';
import { Pool } from 'pg';
import { SituatorEvent } from 'src/domain/entities/situator-event.entity';

type SituatorEventRow = {
  id: string;
  srcextension: string;
  situatoraccountcode: string;
  situatorzonecode: string;
  situatoreventcode: string;
  situatorpriority: string;
  situatorcondominium: string;
  created_at?: Date;
  updated_at?: Date;
};

@Injectable()
export class SituatorEventPgRepository implements SituatorEventGateway {
  public constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  public async listAll(): Promise<SituatorEvent[]> {
    const query = `
      SELECT 
        id,
        srcextension,
        situatoraccountcode,
        situatorzonecode,
        situatoreventcode,
        situatorpriority,
        situatorcondominium
      FROM asterisk.situator_events_epvseguranca
      ORDER BY id
    `;

    const result = await this.pool.query<SituatorEventRow>(query);
    return result.rows.map((row) => this.mapRowToEntity(row));
  }

  public async update(
    id: string,
    input: {
      srcextension: string;
      situatoraccountcode: string;
      situatorzonecode: string;
      situatoreventcode: string;
      situatorpriority: string;
      situatorcondominium: string;
    },
  ): Promise<SituatorEvent> {
    const existingQuery = `
      SELECT 
        id,
        srcextension,
        situatoraccountcode,
        situatorzonecode,
        situatoreventcode,
        situatorpriority,
        situatorcondominium
      FROM asterisk.situator_events_epvseguranca
      WHERE id = $1
    `;
    const existingResult = await this.pool.query<SituatorEventRow>(
      existingQuery,
      [id],
    );

    if (existingResult.rowCount === 0) {
      throw new Error(`Situator event ${id} not found`);
    }

    const existing = this.mapRowToEntity(existingResult.rows[0]);
    existing.update(input);

    const updateQuery = `
      UPDATE asterisk.situator_events_epvseguranca
      SET
        srcextension = $1,
        situatoraccountcode = $2,
        situatorzonecode = $3,
        situatoreventcode = $4,
        situatorpriority = $5,
        situatorcondominium = $6
      WHERE id = $7
      RETURNING 
        id,
        srcextension,
        situatoraccountcode,
        situatorzonecode,
        situatoreventcode,
        situatorpriority,
        situatorcondominium
    `;

    const updateResult = await this.pool.query<SituatorEventRow>(updateQuery, [
      existing.getSrcextension(),
      existing.getSituatoraccountcode(),
      existing.getSituatorzonecode(),
      existing.getSituatoreventcode(),
      existing.getSituatorpriority(),
      existing.getSituatorcondominium(),
      id,
    ]);

    return this.mapRowToEntity(updateResult.rows[0]);
  }

  private mapRowToEntity(row: SituatorEventRow): SituatorEvent {
    const createdAt = row.created_at ? new Date(row.created_at) : new Date();
    const updatedAt = row.updated_at ? new Date(row.updated_at) : createdAt;

    return SituatorEvent.with({
      id: String(row.id),
      srcextension: row.srcextension,
      situatoraccountcode: row.situatoraccountcode,
      situatorzonecode: row.situatorzonecode,
      situatoreventcode: row.situatoreventcode,
      situatorpriority: row.situatorpriority,
      situatorcondominium: row.situatorcondominium,
      createdAt,
      updatedAt,
    });
  }
}

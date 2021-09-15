import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AnalysisService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) { }
}

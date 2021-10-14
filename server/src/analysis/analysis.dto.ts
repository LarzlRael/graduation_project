import { IsEnum, IsNumber } from 'class-validator';
import { OrderBy, Departamento } from '../maps/dto/orderBy';

export class AnalysisDto {
  dateStart: Date;
  dateEnd: Date;

  @IsEnum(Departamento)
  departamento: Departamento;

  limit: number;
  @IsEnum(OrderBy)
  orderBy: OrderBy;
}

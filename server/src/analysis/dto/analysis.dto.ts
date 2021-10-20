import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderBy, Departamento } from '../../maps/dto/orderBy';

export class AnalysisDto {
  dateStart: Date;
  dateEnd: Date;
  provincia: string;
  municipio: string;
  @IsOptional()
  @IsEnum(Departamento)
  departamento: Departamento;

  limit: number;
  @IsEnum(OrderBy)
  @IsOptional()
  orderBy: OrderBy;
}

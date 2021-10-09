import { IsEnum, IsOptional } from 'class-validator';
import { ORDER_BY } from './orderBy';
export class MapDto {
  dateNow: Date;

  dateStart: Date;
  dateEnd: Date;
  departaments?: string;

  @IsEnum(ORDER_BY)
  @IsOptional()
  orderBy: ORDER_BY;
}

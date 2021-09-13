import { IsEnum } from 'class-validator';
import { ORDER_BY } from './orderBy';
export class MapDto {
  dateNow: Date;

  dateStart: Date;

  dateEnd: Date;

  @IsEnum(ORDER_BY)
  orderBy: ORDER_BY;
}

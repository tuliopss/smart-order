import { IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../enums/orderStatus.enum';

export class UpdateOrderStatusDTO {
  @IsNotEmpty()
  status: OrderStatus;
}

import { OrderStatus } from '../enums/orderStatus.enum';

export class CreateOrderDto {
  tableID: string;
  product: String;
  quantity: Number;
  price: Number;
  orderTime: Date;
}

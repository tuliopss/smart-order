import { Document } from 'mongoose';
import { OrderStatus } from '../enums/orderStatus.enum';

export interface IOrder extends Document {
  tableID: Number;
  product: String;
  quantity: Number;
  price: Number;
  orderTime: Date;
  status: OrderStatus;
}

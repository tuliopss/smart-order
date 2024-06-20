import { Document } from 'mongoose';
import { OrderStatus } from '../enums/orderStatus.enum';

export interface IOrder extends Document {
  product: String;
  quantity: Number;
  price: Number;
  orderTime: Date;
  status: OrderStatus;
}

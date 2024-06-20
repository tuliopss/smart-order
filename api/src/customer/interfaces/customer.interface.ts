import { Document } from 'mongoose';
import { IOrder } from 'src/orders/interfaces/order.interface';

export interface ICustomer extends Document {
  name: string;
  cpf: string;
  tableID: number;
  orders: Array<IOrder>;
}

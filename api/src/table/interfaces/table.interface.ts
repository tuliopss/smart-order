import { Document } from 'mongoose';
import { ICustomer } from 'src/customer/interfaces/customer.interface';
import { IOrder } from 'src/orders/interfaces/order.interface';

export interface ITable extends Document {
  tableID: number;
  orders: IOrder[];
  //   customers: ICustomer[]
}

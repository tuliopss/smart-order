import { UpdateTableDto } from './../table/dto/update-table.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IOrder } from './interfaces/order.interface';
import { Model } from 'mongoose';
import { TableService } from 'src/table/table.service';
import { OrderStatus } from './enums/orderStatus.enum';
import { OrderToUpdateTableDTO } from './dto/order-to-update-table.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('order') private readonly orderModel: Model<IOrder>,
    private readonly tableService: TableService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    orderToUpdateTableDTO: OrderToUpdateTableDTO,
  ) {
    try {
      const table = await this.tableService.findTableByID(
        createOrderDto.tableID,
      );

      const newOrder = new this.orderModel(createOrderDto);
      newOrder.orderTime = new Date();

      newOrder.status = OrderStatus.RECEIVED;
      orderToUpdateTableDTO.order = newOrder;
      console.log(newOrder);

      await this.tableService.updateTableOrders(
        table.tableID,
        orderToUpdateTableDTO,
      );

      return await newOrder.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    // return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

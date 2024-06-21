import { UpdateTableDto } from './../table/dto/update-table.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IOrder } from './interfaces/order.interface';
import { isValidObjectId, Model } from 'mongoose';
import { TableService } from 'src/table/table.service';
import { OrderStatus } from './enums/orderStatus.enum';
import { OrderToUpdateTableDTO } from './dto/order-to-update-table.dto';
import { UpdateOrderStatusDTO } from './dto/update-orderStatus.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('order') private readonly orderModel: Model<IOrder>,
    private readonly tableService: TableService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    orderToUpdateTableDTO: OrderToUpdateTableDTO,
  ): Promise<IOrder> {
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

  async findAllOrders(): Promise<IOrder[]> {
    try {
      const orders = await this.orderModel.find();

      if (orders.length === 0) {
        throw new NotFoundException('Não há pedidos realizados...');
      }

      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOrderById(id: string): Promise<IOrder> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido.');
      }
      const order = await this.orderModel.findById(id);

      if (!order) {
        throw new NotFoundException('Pedido não encontrado...');
      }

      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDTO,
  ) {
    try {
      const order = await this.findOrderById(id);

      const status = updateOrderStatusDto.status;

      order.status = status;

      return await this.orderModel.findByIdAndUpdate(id, order);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

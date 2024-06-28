import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderToUpdateTableDTO } from './dto/order-to-update-table.dto';
import { UpdateOrderStatusDTO } from './dto/update-orderStatus.dto';
import { validationsParamsPipe } from 'src/common/pipes/validations-params-pipe.pipe';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Body() orderToUpdateTableDTO: OrderToUpdateTableDTO,
  ) {
    return this.ordersService.createOrder(
      createOrderDto,
      orderToUpdateTableDTO,
    );
  }

  @Get('/')
  async findAllOrders() {
    return await this.ordersService.findAllOrders();
  }

  @Get(':id')
  async findOrderById(@Param('id', validationsParamsPipe) id: string) {
    return await this.ordersService.findOrderById(id);
  }

  @Patch('/status/:id')
  @UsePipes(ValidationPipe)
  async updateOrderStatus(
    @Param('id', validationsParamsPipe) id: string,
    @Body() updateOrderStatusDTO: UpdateOrderStatusDTO,
  ) {
    return this.ordersService.updateOrderStatus(id, updateOrderStatusDTO);
  }

  @Patch('/cancel/:id')
  async cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(id);
  }

  @Delete('/:id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}

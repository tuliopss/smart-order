import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { TableModule } from 'src/table/table.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }]),
    TableModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

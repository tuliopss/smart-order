import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/smart-order'),
    OrdersModule,
    CustomerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

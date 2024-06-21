import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TableSchema } from './schemas/table.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'table', schema: TableSchema }]),
  ],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}

import { OrderToUpdateTableDTO } from './../orders/dto/order-to-update-table.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITable } from './interfaces/table.interface';
import { IOrder } from 'src/orders/interfaces/order.interface';

@Injectable()
export class TableService {
  constructor(
    @InjectModel('table') private readonly tableModel: Model<ITable>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<ITable> {
    try {
      const { tableID } = createTableDto;
      const tableAlreadyCreated = await this.tableModel.findOne({
        tableID: tableID,
      });

      if (tableAlreadyCreated) {
        throw new BadRequestException(`Mesa ${tableID} já registrada`);
      }

      const tableCreated = new this.tableModel(createTableDto);

      return await tableCreated.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllTables(): Promise<ITable[]> {
    try {
      const tables = await this.tableModel.find();

      if (tables.length === 0) {
        throw new NotFoundException('Não há mesas cadastradas...');
      }

      return tables;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findTableByID(tableID: string): Promise<ITable> {
    const table = await this.tableModel
      .findOne({ tableID: tableID })
      .populate([{ path: 'orders', model: 'order' }]);
    if (!table) {
      throw new NotFoundException(`Mesa ${tableID} não encontrada`);
    }

    return table;
  }

  async getTableOrders(tableID: string) {
    const table = await this.findTableByID(tableID);

    return table.orders;
  }

  async updateTableOrders(
    tableID: number,
    orderToUpdateTable: OrderToUpdateTableDTO,
  ) {
    const table = await this.tableModel.findOne({ tableID: tableID });

    if (!table) {
      throw new NotFoundException(`Mesa ${tableID} não encontrada`);
    }
    table.orders.push(orderToUpdateTable.order);

    return await this.tableModel.findOneAndUpdate(
      { tableID: tableID },
      { $set: table },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}

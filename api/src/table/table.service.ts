import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITable } from './interfaces/table.interface';

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

  async findAllTables() {
    return await this.tableModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}

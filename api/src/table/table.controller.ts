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
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { OrderToUpdateTableDTO } from 'src/orders/dto/order-to-update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createTableDto: CreateTableDto) {
    return await this.tableService.create(createTableDto);
  }

  @Get()
  async findAll() {
    return await this.tableService.findAllTables();
  }

  @Get(':tableID')
  async findTableByID(@Param('tableID') tableID: string) {
    return await this.tableService.findTableByID(tableID);
  }

  @Get('/orders/:tableID')
  async getTableOrders(@Param('tableID') tableID: string) {
    return await this.tableService.getTableOrders(tableID);
  }

  @Patch(':tableID')
  updateTableOrders(
    @Param('tableID') id: number,
    @Body() orderToUpdateTable: OrderToUpdateTableDTO,
  ) {
    console.log('controller', orderToUpdateTable);
    return this.tableService.updateTableOrders(id, orderToUpdateTable);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}

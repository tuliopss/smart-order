import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ICustomer } from './interfaces/customer.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateOrReject } from 'class-validator';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('customer') private readonly customerModel: Model<ICustomer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<ICustomer> {
    try {
      const { tableID } = createCustomerDto;
      const customerCreated = new this.customerModel(createCustomerDto);

      return await customerCreated.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<ICustomer[]> {
    try {
      const customers = await this.customerModel.find();

      if (customers.length === 0) {
        throw new NotFoundException(`Não foi encontrado clientes cadastrados`);
      }

      return customers;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<ICustomer> {
    try {
      const customer = await this.customerModel.findById(id);

      if (!customer) {
        throw new NotFoundException(`Cliente não encontrado`);
      }

      return customer;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}

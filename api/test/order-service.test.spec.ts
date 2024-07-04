import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../src/orders/orders.service';
import { TableModule } from '../src/table/table.module';

describe('orderService tests', () => {
  let orderService: OrdersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
      imports: [TableModule],
    }).compile();
    orderService = moduleFixture.get<OrdersService>(OrdersService);
  });

  it('Should be defined', () => {
    expect(orderService).toBeDefined();
  });
});

import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly tableID: number;
}

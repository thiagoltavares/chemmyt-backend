import { v4 as uuid } from 'uuid';

class Product {
  id: string;

  code: number;

  name: string;

  date: Date;

  unitOfMeasurement: string;

  amount: number;

  constructor({
    amount,
    code,
    date,
    name,
    unitOfMeasurement,
  }: Omit<Product, 'id'>) {
    this.id = uuid();
    this.code = code;
    this.name = name;
    this.date = date;
    this.unitOfMeasurement = unitOfMeasurement;
    this.amount = amount;
  }
}

export default Product;

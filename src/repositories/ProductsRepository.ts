import Product from '../models/Product';

interface CreateProductDTO {
  code: number;
  name: string;
  date: Date;
  unitOfMeasurement: string;
  amount: number;
}

class ProductsRepository {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  public all(): Product[] {
    return this.products;
  }

  public findByCode(code: number): Product | null {
    const findProduct = this.products.find(product => product.code === code);

    return findProduct || null;
  }

  public createProduct({
    code,
    amount,
    date,
    name,
    unitOfMeasurement,
  }: CreateProductDTO): Product {
    const product: Product = new Product({
      code,
      name,
      unitOfMeasurement,
      date,
      amount,
    });

    this.products.push(product);

    return product;
  }
}

export default ProductsRepository;

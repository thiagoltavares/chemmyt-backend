import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface RequestDTO {
  code: number;
  name: string;
  date: Date;
  unitOfMeasurement: string;
  amount: number;
}

class CreateProductService {
  private productsRepository: ProductsRepository;

  constructor(productRepository: ProductsRepository) {
    this.productsRepository = productRepository;
  }

  public execute({
    code,
    name,
    date,
    unitOfMeasurement,
    amount,
  }: RequestDTO): Product {
    const productExists = this.productsRepository.findByCode(code);

    if (productExists) {
      throw Error('This product is already in inventory');
    }

    const product = new Product({
      amount,
      unitOfMeasurement,
      name,
      date,
      code,
    });

    this.productsRepository.createProduct(product);

    return product;
  }
}

export default CreateProductService;

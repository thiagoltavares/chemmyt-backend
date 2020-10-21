import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface RequestDTO {
  code: number;
  name: string;
  expiration: Date;
  batch: string;
}

class CreateProductService {
  public async execute({
    code,
    name,
    expiration,
    batch,
  }: RequestDTO): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = productsRepository.create({
      code,
      name,
      expiration,
      batch,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;

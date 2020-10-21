import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findByCode(code: number): Promise<Product | null> {
    const findProduct = await this.findOne({
      where: { code },
    });

    return findProduct || null;
  }
}

export default ProductsRepository;

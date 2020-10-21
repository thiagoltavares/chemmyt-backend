import { EntityRepository, Repository } from 'typeorm';
import Warehouse from '../models/Warehouse';

@EntityRepository(Warehouse)
class WarehousesRepository extends Repository<Warehouse> {
  public async findByCode(code: number): Promise<Warehouse | null> {
    const findWarehouse = await this.findOne({
      where: { code },
    });

    return findWarehouse || null;
  }
}

export default WarehousesRepository;

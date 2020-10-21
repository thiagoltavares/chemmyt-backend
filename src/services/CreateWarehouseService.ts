import { getCustomRepository, Repository } from 'typeorm';
import Warehouse from '../models/Warehouse';
import WarehousesRepository from '../repositories/WarehousesRepository';

interface RequestDTO {
  id: string;
  code: number;
  name: string;
}

class CreateWarehouseService extends Repository<Warehouse> {
  public async execute({ id, code, name }: RequestDTO): Promise<Warehouse> {
    const warehouseRepository = getCustomRepository(WarehousesRepository);

    const warehouse = warehouseRepository.create({
      id,
      code,
      name,
    });

    await warehouseRepository.save(warehouse);

    return warehouse;
  }
}

export default CreateWarehouseService;

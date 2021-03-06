import { getCustomRepository, Repository } from 'typeorm';
import Warehouse from '../models/Warehouse';
import WarehousesRepository from '../repositories/WarehousesRepository';

interface RequestDTO {
  code: number;
  name: string;
  branch_id: string;
}

class CreateWarehouseService extends Repository<Warehouse> {
  public async execute({
    code,
    name,
    branch_id,
  }: RequestDTO): Promise<Warehouse> {
    const warehouseRepository = getCustomRepository(WarehousesRepository);

    const warehouse = warehouseRepository.create({
      code,
      name,
      branch_id,
    });

    await warehouseRepository.save(warehouse);

    return warehouse;
  }
}

export default CreateWarehouseService;

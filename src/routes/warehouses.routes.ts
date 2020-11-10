import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import Warehouse from '../models/Warehouse';
import WarehousesRepository from '../repositories/WarehousesRepository';
import CreateWarehouseService from '../services/CreateWarehouseService';

const warehousesRouter = Router();

warehousesRouter.get('/', async (request, response) => {
  const warehousesRepository = getCustomRepository(WarehousesRepository);

  const warehouse = await warehousesRepository.find();

  return response.json(warehouse);
});

warehousesRouter.post('/', async (request, response) => {
  const { code, name, branch_id }: Warehouse = request.body;

  const createWarehouse = new CreateWarehouseService();

  const warehouse = createWarehouse.execute({ code, name, branch_id });

  return response.json(warehouse);
});

export default warehousesRouter;

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import Warehouse from '../models/Warehouse';
import WarehousesRepository from '../repositories/WarehousesRepository';
import CreateWarehouseService from '../services/CreateWarehouseService';

const warehousesRouter = Router();

warehousesRouter.get('/', async (request, response) => {
  try {
    const warehousesRepository = getCustomRepository(WarehousesRepository);

    const warehouse = await warehousesRepository.find();

    return response.json(warehouse);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

warehousesRouter.post('/', async (request, response) => {
  try {
    const { code, name }: Warehouse = request.body;

    const createWarehouse = new CreateWarehouseService();

    const warehouse = createWarehouse.execute({ code, name });

    return response.json(warehouse);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default warehousesRouter;

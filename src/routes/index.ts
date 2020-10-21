import { Router } from 'express';
import productsRouter from './products.routes';
import branchesRouter from './branches.routes';
import warehousesRouter from './warehouses.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/branches', branchesRouter);
routes.use('/warehouses', warehousesRouter);

export default routes;

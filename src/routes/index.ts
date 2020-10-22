import { Router } from 'express';
import productsRouter from './products.routes';
import branchesRouter from './branches.routes';
import warehousesRouter from './warehouses.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/branches', branchesRouter);
routes.use('/warehouses', warehousesRouter);
routes.use('/users', userRouter);

export default routes;

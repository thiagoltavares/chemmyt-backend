import { Router } from 'express';
import productsRouter from './products.routes';
import branchesRouter from './branches.routes';
import warehousesRouter from './warehouses.routes';
import userRouter from './users.routes';
import movimentationRouter from './movimentation.routes';
import sessionsRoute from './sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/branches', branchesRouter);
routes.use('/warehouses', warehousesRouter);
routes.use('/users', userRouter);
routes.use('/movimentations', movimentationRouter);
routes.use('/sessions', sessionsRoute);

export default routes;

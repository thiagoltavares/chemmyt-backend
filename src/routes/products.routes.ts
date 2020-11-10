import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);

  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  const { code, name, expiration, batch } = request.body;

  const parsedExpiration = parseISO(expiration);

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    code,
    name,
    expiration: parsedExpiration,
    batch,
  });

  return response.json(product);
});

export default productsRouter;

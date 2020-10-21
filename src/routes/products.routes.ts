import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  try {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.find();

    return response.json(products);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

productsRouter.post('/', async (request, response) => {
  try {
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
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;

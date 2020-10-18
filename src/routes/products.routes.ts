import { parseISO } from 'date-fns';
import { Router } from 'express';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

const productsRepository = new ProductsRepository();
const createProductService = new CreateProductService(productsRepository);

productsRouter.get('/', (request, response) => {
  const products = productsRepository.all();
  return response.json(products);
});

productsRouter.post('/', (request, response) => {
  const { code, name, date, amount, unitOfMeasurement } = request.body;
  const parsedDate = parseISO(date);

  try {
    const product = createProductService.execute({
      code,
      name,
      date: parsedDate,
      unitOfMeasurement,
      amount,
    });
    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;

import { parseISO } from 'date-fns';
import { Router } from 'express';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

const productsRouter = Router();

const productsRepository = new ProductsRepository();

productsRouter.get('/', (request, response) => {
  const products = productsRepository.all();
  return response.json(products);
});

productsRouter.post('/', (req, res) => {
  const { code, name, date, amount, unitOfMeasurement } = req.body;

  const productExists = productsRepository.findByCode(code);
  const parsedDate = parseISO(date);

  if (productExists) {
    return res
      .status(400)
      .json({ message: 'This product is already in inventory' });
  }

  const product = new Product({
    amount,
    unitOfMeasurement,
    name,
    date: parsedDate,
    code,
  });

  productsRepository.createProduct(product);

  return res.json(product);
});

export default productsRouter;

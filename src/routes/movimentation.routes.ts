import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import MovimentationRepository from '../repositories/MovimentationRepository';
import CreateMovimentationService from '../services/CreateMovimentationService';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';

const movimentationRouter = Router();
movimentationRouter.use(ensuredAuthenticated);

movimentationRouter.get('/', async (request, response) => {
  try {
    const movimentationRepository = getCustomRepository(
      MovimentationRepository,
    );

    const movimentation = await movimentationRepository.find();

    return response.json(movimentation);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

movimentationRouter.post('/', async (request, response) => {
  try {
    const { quantity, branch_id, warehouse_id, product_id } = request.body;
    const { id } = request.user;

    const createMovimentationService = new CreateMovimentationService();

    const movimentation = createMovimentationService.execute({
      quantity,
      branch_id,
      warehouse_id,
      product_id,
      user_id: id,
    });
    return response.json(movimentation);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default movimentationRouter;

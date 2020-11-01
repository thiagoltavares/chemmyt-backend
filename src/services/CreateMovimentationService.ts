import { getCustomRepository } from 'typeorm';
import Movimentation from '../models/Movimentation';
import MovimentationRepository from '../repositories/MovimentationRepository';

interface RequestDTO {
  quantity: number;
  branch_id: string;
  warehouse_id: string;
  product_id: string;
  user_id: string;
}

class CreateMovimentationService {
  public async execute({
    quantity,
    branch_id,
    warehouse_id,
    product_id,
    user_id,
  }: RequestDTO): Promise<Movimentation> {
    const movimentationRepository = getCustomRepository(
      MovimentationRepository,
    );

    const movimentation = movimentationRepository.create({
      quantity,
      branch_id,
      warehouse_id,
      product_id,
      user_id,
    });

    await movimentationRepository.save(movimentation);

    return movimentation;
  }
}

export default CreateMovimentationService;

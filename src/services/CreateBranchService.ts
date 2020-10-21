import { getCustomRepository } from 'typeorm';
import Branch from '../models/Branch';
import BranchesRepository from '../repositories/BranchesRepository';

interface RequestDTO {
  code: number;
  name: string;
  address: string;
  cnpj: string;
}

class CreateBranchService {
  public async execute({
    code,
    name,
    address,
    cnpj,
  }: RequestDTO): Promise<Branch> {
    const branchesRepository = getCustomRepository(BranchesRepository);

    const branch = branchesRepository.create({
      code,
      name,
      address,
      cnpj,
    });

    await branchesRepository.save(branch);

    return branch;
  }
}

export default CreateBranchService;

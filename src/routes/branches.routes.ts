import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import Branch from '../models/Branch';
import BranchesRepository from '../repositories/BranchesRepository';
import CreateBranchService from '../services/CreateBranchService';

const branchesRouter = Router();

branchesRouter.get('/', async (request, response) => {
  const branchesRepository = getCustomRepository(BranchesRepository);

  const branches = await branchesRepository.find();

  return response.json(branches);
});

branchesRouter.post('/', async (request, response) => {
  const { code, name, address, cnpj }: Omit<Branch, 'id'> = request.body;

  const createBranch = new CreateBranchService();

  const branch = createBranch.execute({ code, name, cnpj, address });

  return response.json(branch);
});

export default branchesRouter;

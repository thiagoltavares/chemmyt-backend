import { EntityRepository, Repository } from 'typeorm';
import Branch from '../models/Branch';

@EntityRepository(Branch)
class BranchesRepository extends Repository<Branch> {
  public async findByCode(code: number): Promise<Branch | null> {
    const findBranch = await this.findOne({
      where: { code },
    });

    return findBranch || null;
  }
}

export default BranchesRepository;

import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByRegistration(registration: number): Promise<User | null> {
    const findUser = await this.findOne({
      where: { registration },
    });

    return findUser || null;
  }
}

export default UsersRepository;

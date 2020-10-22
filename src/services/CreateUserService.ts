import { getCustomRepository, Repository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  registration: number;
  name: string;
  password: string;
}

class CreateUserService extends Repository<User> {
  public async execute({
    registration,
    name,
    password,
  }: RequestDTO): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = userRepository.create({ registration, name, password });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;

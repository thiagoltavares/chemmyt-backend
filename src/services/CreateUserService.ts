import { getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

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
    const userRepository = getRepository(User);
    const hashPassaword = await hash(password, 8);

    const user = userRepository.create({
      registration,
      name,
      password: hashPassaword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;

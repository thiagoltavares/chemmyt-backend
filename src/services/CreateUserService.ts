import { getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

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

    const checkUserExists = await userRepository.findOne({
      where: { registration },
    });

    if (checkUserExists) {
      throw new AppError('Registration already exist');
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      registration,
      name,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;

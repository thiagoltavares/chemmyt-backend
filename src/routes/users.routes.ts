import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  try {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return response.json(users);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    const { registration, name, password }: User = request.body;

    const createUser = new CreateUserService();

    const user = createUser.execute({ registration, name, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default usersRouter;

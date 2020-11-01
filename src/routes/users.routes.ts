import { Router } from 'express';
import { getRepository } from 'typeorm';
import UserMap from '../database/mappers/UserMap';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  try {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();
    const mappedUsers = users.map(user => UserMap.toDTO(user));

    return response.json(mappedUsers);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    const { registration, name, password }: User = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ registration, name, password });

    return response.json(UserMap.toDTO(user));
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default usersRouter;

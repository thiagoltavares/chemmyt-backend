import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import UserMap from '../database/mappers/UserMap';
import ensureAuthenticated from '../middlewares/ensuredAuthenticated';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();
  const mappedUsers = users.map(user => UserMap.toDTO(user));

  return response.json(mappedUsers);
});

usersRouter.post('/', async (request, response) => {
  const { registration, name, password }: User = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ registration, name, password });

  return response.json(UserMap.toDTO(user));
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userWithoutPassword = UserMap.toDTO(user);

    return response.json(userWithoutPassword);
  },
);
export default usersRouter;

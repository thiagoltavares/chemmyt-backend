import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ avatarFilename, user_id }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated user can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.diretory, user.avatar);
      const userAvatarExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

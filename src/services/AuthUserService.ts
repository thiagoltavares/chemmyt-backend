import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface RequestDTO {
  registration: number;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthUserService {
  public async execute({
    registration,
    password,
  }: RequestDTO): Promise<ResponseDTO> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { registration } });

    if (!user) {
      throw new AppError('Incorret registration/password', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorret registration/password!', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default AuthUserService;

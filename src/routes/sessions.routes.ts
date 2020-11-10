import { Router } from 'express';
import UserMap from '../database/mappers/UserMap';
import AuthUserService from '../services/AuthUserService';

const sessionsRoute = Router();

sessionsRoute.post('/', async (request, response) => {
  const { registration, password } = request.body;

  const authUserService = new AuthUserService();

  const { user, token } = await authUserService.execute({
    registration,
    password,
  });

  const mappedUser = UserMap.toDTO(user);

  return response.json({ user: mappedUser, token });
});

export default sessionsRoute;

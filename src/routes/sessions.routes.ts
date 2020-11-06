import { Router } from 'express';
import UserMap from '../database/mappers/UserMap';
import AuthUserService from '../services/AuthUserService';

const sessionsRoute = Router();

sessionsRoute.post('/', async (request, response) => {
  try {
    const { registration, password } = request.body;

    const authUserService = new AuthUserService();

    const { user, token } = await authUserService.execute({
      registration,
      password,
    });

    const mappedUser = UserMap.toDTO(user);

    response.json({ user: mappedUser, token });
  } catch (err) {
    return response.status(400).send({ error: err.message });
  }
});

export default sessionsRoute;

import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ email, name, password });

    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      create_at: user.create_at,
      update_at: user.update_at,
    };

    return res.json(newUser);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

usersRouter.get('/', async (req, res) => {
  const usersRepository = getRepository(User);

  const users = usersRepository.find();

  return res.json(users);
});

export default usersRouter;

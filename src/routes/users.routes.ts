import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

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

  const users = await usersRepository.find();

  return res.json(users);
});

usersRouter.delete('/:id', async (req, res) => {
  const usersRepository = getRepository(User);

  const { id } = req.params;

  const user = await usersRepository.findOne({
    where: { id },
  });

  if (user) {
    await usersRepository.delete(id);

    return res.json({
      message: 'user delete in database',
    });
  }
  return res.status(400).json({
    message: 'User not exist in database',
  });
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const { id } = req.params;

    const userUpdate = new UpdateUserService();

    await userUpdate.execute({
      email,
      id,
      password,
      name,
    });

    return res.json({ message: 'user update yes' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default usersRouter;

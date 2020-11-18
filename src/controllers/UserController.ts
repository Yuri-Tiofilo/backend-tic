import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
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
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, password, email } = req.body;
      const { id } = req.params;

      const userUpdate = new UpdateUserService();

      const user = await userUpdate.execute({
        email,
        id,
        password,
        name,
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
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
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return res.json(users);
  }
}

export default UserController;

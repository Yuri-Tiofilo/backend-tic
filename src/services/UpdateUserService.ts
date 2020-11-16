import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<void> {
    const usersRepository = getRepository(User);

    const userExist = await usersRepository.findOne({
      where: { id },
    });

    if (!userExist) {
      throw new Error('User not exist');
    }

    const hasedPassword = await hash(password, 8);

    const response = await usersRepository.merge(userExist, {
      name,
      email,
      password: hasedPassword,
    });

    await usersRepository.save(response);
  }
}

export default UpdateUserService;

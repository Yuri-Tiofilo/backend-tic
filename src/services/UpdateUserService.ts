import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import User from '../models/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const userExist = await usersRepository.findOne({
      where: { id },
    });

    if (!userExist) {
      throw new Error('User not exist');
    }

    if (password !== '') {
      const userPasswordCompare = await compare(password, userExist.password);

      if (!userPasswordCompare) {
        const hasedPassword = await hash(password, 8);

        const user = await usersRepository.merge(userExist, {
          name,
          email,
          password: hasedPassword,
        });

        await usersRepository.save(user);

        return user;
      }

      const user = await usersRepository.merge(userExist, {
        name,
        email,
        password: userExist.password,
      });

      await usersRepository.save(user);

      return user;
    }

    const user = await usersRepository.merge(userExist, {
      name,
      email,
    });
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;

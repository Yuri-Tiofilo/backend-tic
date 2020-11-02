import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';

import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const userExist = await usersRepository.findOne({
      where: { email },
    });

    if (userExist) {
      throw new Error('Email addres already used');
    }

    const hasedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hasedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

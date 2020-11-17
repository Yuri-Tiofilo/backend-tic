import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import Provider from '../models/Provider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cep: string;
  city: string;
  cnpj: string;
  cpf: string;
  complement: string;
  nameLocale: string;
  neighborhood: string;
  noteLocale: string;
  number: string;
  street: string;
  uf: string;
}

class CreateProviderService {
  public async execute({
    name,
    email,
    password,
    cep,
    city,
    cnpj,
    cpf,
    complement,
    nameLocale,
    neighborhood,
    noteLocale,
    number,
    street,
    uf,
  }: IRequest): Promise<Provider> {
    const providerRepository = getRepository(Provider);

    const providerExist = await providerRepository.findOne({
      where: { email },
    });

    if (providerExist) {
      throw new Error('Email addres already used');
    }

    const hasedPassword = await hash(password, 8);

    const provider = providerRepository.create({
      name,
      email,
      password: hasedPassword,
      cep,
      city,
      cnpj,
      cpf,
      complement,
      nameLocale,
      neighborhood,
      noteLocale,
      number,
      street,
      uf,
    });

    await providerRepository.save(provider);

    return provider;
  }
}

export default CreateProviderService;

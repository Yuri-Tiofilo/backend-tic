import { compare, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import Provider from '../models/Provider';

interface IRequest {
  id: string;
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

class UpdateProviderService {
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
    id,
  }: IRequest): Promise<Provider> {
    const providerRepository = getRepository(Provider);

    const providerExist = await providerRepository.findOne({
      where: { id },
    });

    if (!providerExist) {
      throw new Error('User not exist');
    }

    if (password !== '') {
      const userPasswordCompare = await compare(
        password,
        providerExist.password,
      );

      if (!userPasswordCompare) {
        const hasedPassword = await hash(password, 8);

        const provider = await providerRepository.merge(providerExist, {
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

      const provider = await providerRepository.merge(providerExist, {
        name,
        email,
        password: providerExist.password,
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

    const provider = await providerRepository.merge(providerExist, {
      name,
      email,
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

export default UpdateProviderService;

import { getRepository } from 'typeorm';

import Provider from '../models/Provider';
import Service from '../models/Service';

interface IRequest {
  name: string;
  duration: string;
  note: string;
  value: string;
  provider_id: string;
}

class CreateService {
  public async execute({
    name,
    duration,
    note,
    value,
    provider_id,
  }: IRequest): Promise<Service> {
    const providerRepository = getRepository(Provider);
    const serviceRepository = getRepository(Service);

    const providerExist = await providerRepository.findOne({
      where: { id: provider_id },
    });

    if (!providerExist) {
      throw new Error('Provider not exist in database');
    }

    const service = serviceRepository.create({
      name,
      duration,
      note,
      value,
      provider_id,
    });

    await serviceRepository.save(service);

    return service;
  }
}

export default CreateService;

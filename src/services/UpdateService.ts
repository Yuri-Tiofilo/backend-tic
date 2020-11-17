import { getRepository } from 'typeorm';

import Service from '../models/Service';

interface IRequest {
  name: string;
  duration: string;
  note: string;
  value: string;
  id: string;
  provider_id: string;
}

class UpdateService {
  public async execute({
    name,
    duration,
    note,
    value,
    id,
  }: IRequest): Promise<void> {
    const serviceRepository = getRepository(Service);

    const serviceExist = await serviceRepository.findOne({
      where: {
        id,
      },
    });

    if (!serviceExist) {
      throw new Error('Service not exist');
    }

    // const service = await serviceRepository.merge({
    //   name,
    //   duration,
    //   note,
    //   value,
    //   provider_id,
    //   id,
    // });

    // await serviceRepository.save(service);

    // return {
    //   name,
    //   duration,
    //   note,
    //   value,
    //   id,
    //   provider_id,
    // };
  }
}

export default UpdateService;

import { getRepository } from 'typeorm';
import ScheduleProvider from '../models/ScheduleProvider';
import Provider from '../models/Provider';

interface IRequest {
  provider_id: string;
  of: string;
  up_to: string;
}

class CreateScheduleProviderService {
  public async execute({
    provider_id,
    of,
    up_to,
  }: IRequest): Promise<ScheduleProvider> {
    const scheduleProviderRepository = getRepository(ScheduleProvider);
    const providerRepository = getRepository(Provider);

    const providerExist = await providerRepository.findOne({
      where: { id: provider_id },
    });

    if (!providerExist) {
      throw new Error('Provider not exist');
    }

    const scheduleProvider = scheduleProviderRepository.create({
      provider_id,
      of,
      up_to,
    });

    await scheduleProviderRepository.save(scheduleProvider);

    return scheduleProvider;
  }
}

export default CreateScheduleProviderService;

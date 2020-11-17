import { Router } from 'express';
import { getRepository } from 'typeorm';

import Provider from '../models/Provider';
import Service from '../models/Service';

import CreateProviderService from '../services/CreateProviderService';
import UpdateProviderService from '../services/UpdateProviderService';

const providerRouter = Router();

providerRouter.get('/', async (req, res) => {
  const providerRepository = getRepository(Provider);

  const providers = await providerRepository.find();

  return res.json(providers);
});

providerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const providerRepository = getRepository(Provider);
  const serviceRepository = getRepository(Service);

  const provider = await providerRepository.findOne({
    where: { id },
  });

  const serviceFromProvider = await serviceRepository.find({
    where: { provider_id: id },
  });

  const newProvider = {
    ...provider,
    services: serviceFromProvider,
  };

  return res.json(newProvider);
});

providerRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const providerRepository = getRepository(Provider);

  const provider = await providerRepository.findOne({
    where: { id },
  });

  if (provider) {
    await providerRepository.delete(id);

    return res.json({
      message: 'Provider delete in database',
    });
  }
  return res.status(400).json({
    message: 'Provider not exist in database',
  });
});

providerRouter.post('/', async (req, res) => {
  try {
    const createProviderService = new CreateProviderService();

    const provider = await createProviderService.execute({
      ...req.body,
    });

    return res.json(provider);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

providerRouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updateProviderService = new UpdateProviderService();

    const provider = await updateProviderService.execute({
      id,
      ...req.body,
    });

    return res.json(provider);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default providerRouter;

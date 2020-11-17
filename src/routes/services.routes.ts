import { Router } from 'express';
import { getRepository } from 'typeorm';
import Service from '../models/Service';

import CreateService from '../services/CreateService';
import UpdateService from '../services/UpdateService';

const serviceRouter = Router();

serviceRouter.post('/', async (req, res) => {
  try {
    const createService = new CreateService();

    const service = await createService.execute({
      ...req.body,
    });

    return res.json(service);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

serviceRouter.get('/', async (req, res) => {
  const serviceRepository = getRepository(Service);

  const allServices = await serviceRepository.find();

  return res.json(allServices);
});

serviceRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const serviceRepository = getRepository(Service);

  const service = await serviceRepository.findOne({
    where: { id },
  });

  if (service) {
    await serviceRepository.delete(id);

    return res.json({
      message: 'Service delete in database',
    });
  }
  return res.status(400).json({
    message: 'Service not exist in database',
  });
});

serviceRouter.put('/', async (req, res) => {
  const updateService = new UpdateService();

  // await updateService.execute({
  //   ...req.body,
  // });

  return res.json({ ok: true });
});

export default serviceRouter;

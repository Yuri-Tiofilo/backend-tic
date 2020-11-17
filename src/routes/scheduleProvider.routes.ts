import { Router } from 'express';
import { getRepository } from 'typeorm';

import ScheduleProvider from '../models/ScheduleProvider';

import CreateScheduleProviderService from '../services/CreateScheduleProviderService';
// import UpdateScheduleProviderService from '../services/UpdateScheduleProviderService';

const scheduleProviderRouter = Router();

scheduleProviderRouter.post('/', async (req, res) => {
  try {
    const createScheduleProviderService = new CreateScheduleProviderService();

    const scheduleProvider = await createScheduleProviderService.execute({
      ...req.body,
    });

    return res.json(scheduleProvider);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

scheduleProviderRouter.get('/', async (req, res) => {
  const scheduleProviderRepository = getRepository(ScheduleProvider);

  const schedulesProvider = await scheduleProviderRepository.find();

  return res.json(schedulesProvider);
});

scheduleProviderRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const scheduleProviderRepository = getRepository(ScheduleProvider);

  const schedule = await scheduleProviderRepository.findOne({
    where: { id },
  });

  if (schedule) {
    await scheduleProviderRepository.delete(id);

    return res.json({
      message: 'Schedule delete in database',
    });
  }
  return res.status(400).json({
    message: 'Schedule not exist in database',
  });
});

scheduleProviderRouter.put('/:id', (req, res) => {
  return res.json({ ok: true });
});

export default scheduleProviderRouter;

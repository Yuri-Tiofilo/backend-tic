import { Router } from 'express';

import { getCustomRepository, getRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find({
    where: { id },
  });

  return res.json(appointment);
});

appointmentsRouter.post('/', ensureAuthenticate, async (req, res) => {
  try {
    const { provider_id, service_id, date, time, user_id } = req.body;

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      service_id,
      time,
      user_id,
      date,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

appointmentsRouter.get('/:idUser', async (req, res) => {
  const { idUser } = req.params;
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find({
    where: { user_id: idUser },
  });

  return res.json(appointments);
});

export default appointmentsRouter;

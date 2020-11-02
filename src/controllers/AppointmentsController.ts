import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

import CreateAppointmentService from '../services/CreateAppointmentService';

class AppointmentsController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { provider, date } = req.body;

      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        date: parsedDate,
        provider,
      });

      return res.json(appointment);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
  }
}

export default new AppointmentsController();

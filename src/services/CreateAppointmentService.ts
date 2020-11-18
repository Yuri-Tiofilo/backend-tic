import { startOfHour } from 'date-fns';

import { getRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: string;
  user_id: string;
  service_id: string;
  time: string;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
    user_id,
    time,
    service_id,
  }: IRequest): Promise<void> {
    const appointmentsRepository = getRepository(Appointment);

    const appointment = appointmentsRepository.create({
      date,
      provider_id,
      user_id,
      time,
      service_id,
    });

    await appointmentsRepository.save(appointment);
  }
}

export default CreateAppointmentService;

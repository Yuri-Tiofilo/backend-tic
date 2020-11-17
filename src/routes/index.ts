import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionRouter from './session.routes';
import providerRouter from './provider.routes';
import serviceRouter from './services.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/provider', providerRouter);
routes.use('/services', serviceRouter);

export default routes;

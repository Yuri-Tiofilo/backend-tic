import { Router } from 'express';

import UserController from '../controllers/UserController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.post('/', userController.store);
usersRouter.get('/', userController.index);
usersRouter.delete('/:id', userController.destroy);
usersRouter.put('/:id', userController.update);

export default usersRouter;

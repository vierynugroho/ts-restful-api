import { Router } from 'express';
import { UserController } from '../controllers/user';

export const publicRouter = Router();

publicRouter.post('/users', UserController.register);
publicRouter.post('/users/login', UserController.login);

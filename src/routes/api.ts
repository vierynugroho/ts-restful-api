import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { UserController } from '../controllers/user';

export const apiRouter = Router();
apiRouter.use(authMiddleware);

apiRouter.get('/users/current', UserController.get);
apiRouter.patch('/users/current', UserController.update);
apiRouter.delete('/users/current', UserController.logout);

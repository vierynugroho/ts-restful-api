import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { UserController } from '../controllers/user';
import { ContactController } from '../controllers/contact';

export const apiRouter = Router();
apiRouter.use(authMiddleware);

// TODO: User
apiRouter.get('/users/current', UserController.get);
apiRouter.patch('/users/current', UserController.update);
apiRouter.delete('/users/current', UserController.logout);

// TODO: Contact
apiRouter.post('/contacts', ContactController.create);

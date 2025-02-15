import express from 'express';
import { publicRouter } from '../routes/public-api';
import { errorMiddleware } from '../middlewares/error';
import { apiRouter } from '../routes/api';

export const api = express();

api.use(express.json());
api.use('/api/v1', publicRouter);
api.use('/api/v1', apiRouter);
api.use(errorMiddleware);

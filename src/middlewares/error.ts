import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../errors/response';
import { Prisma } from '@prisma/client';

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof ZodError) {
		res.status(400).json({
			status: false,
			message: `Validation Error: ${JSON.stringify(error)}`,
		});
	} else if (error instanceof ResponseError) {
		res.status(error.status).json({
			status: false,
			message: error.message,
		});
	} else if (error instanceof Prisma.PrismaClientKnownRequestError) {
		if (error.code === 'P2002') {
			res.status(400).json({
				status: false,
				message: `Database Constraint Error: ${error.message}`,
			});
		} else {
			res.status(400).json({
				status: false,
				message: `Database Error: ${error.message}`,
			});
		}
	} else {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
};

import { NextFunction, Response } from 'express';
import { prismaClient } from '../app/database';
import { UserRequest } from '../types/user-request';

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
	const token = req.get('X-API-TOKEN');

	if (token) {
		const user = await prismaClient.user.findFirst({
			where: {
				token,
			},
		});

		if (user) {
			req.user = user;
			next();
			return;
		}
	}

	res.status(401).json({
		status: false,
		message: 'unauthorized',
	});
};

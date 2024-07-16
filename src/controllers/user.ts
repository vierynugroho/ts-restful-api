import { NextFunction, Request, Response } from 'express';
import { CreateUserRequest } from '../models/user';
import { UserService } from '../services/user';

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			const response = await UserService.register(request);

			res.status(200).json({
				response,
			});
		} catch (error) {
			next(error);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			const response = await UserService.login(request);

			res.status(200).json({
				response,
			});
		} catch (error) {
			next(error);
		}
	}
}

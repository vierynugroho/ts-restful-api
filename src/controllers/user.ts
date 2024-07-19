import { NextFunction, Request, Response } from 'express';
import { CreateUserRequest, UpdateUserRequest } from '../models/user';
import { UserService } from '../services/user';
import { UserRequest } from '../types/user-request';

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			const response = await UserService.register(request);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			const response = await UserService.login(request);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	static async get(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const response = await UserService.get(req.user!);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	static async update(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const request: UpdateUserRequest = req.body as UpdateUserRequest;
			const response = await UserService.update(req.user!, request);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	static async logout(req: UserRequest, res: Response, next: NextFunction) {
		try {
			await UserService.logout(req.user!);

			res.status(200).json({
				status: true,
				message: 'logout successfully',
			});
		} catch (error) {
			next(error);
		}
	}
}

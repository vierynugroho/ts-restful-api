import { NextFunction, Response } from 'express';
import { UserRequest } from '../types/user-request';
import { CreateContactRequest } from '../models/contact';
import { ContactService } from '../services/contact';

export class ContactController {
	static async create(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const request: CreateContactRequest = req.body as CreateContactRequest;
			const response = await ContactService.create(req.user!, request);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	static async getOne(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const contactId = req.params.contactId;
			const response = await ContactService.getOne(req.user!, contactId);

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}
}

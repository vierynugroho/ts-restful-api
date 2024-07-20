import { User } from '@prisma/client';
import { prismaClient } from '../app/database';
import { ContactResponse, CreateContactRequest, toContactResponse } from '../models/contact';
import { ContactValidation } from '../validations/contact';
import { Validation } from '../validations/validation';
import { v4 as uuid } from 'uuid';

export class ContactService {
	static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
		const data = Validation.validate(ContactValidation.CREATE, request);

		const contact = await prismaClient.contact.create({
			data: {
				id: uuid(),
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				phone: data.phone,
				username: user.username,
			},
		});

		return toContactResponse(contact);
	}
}

import { User } from '@prisma/client';
import { prismaClient } from '../src/app/database';
import bcrypt from 'bcrypt';

export class UserTest {
	static async delete() {
		await prismaClient.user.deleteMany({
			where: {
				username: 'test',
			},
		});
	}

	static async create() {
		await prismaClient.user.create({
			data: {
				username: 'test',
				name: 'test',
				password: await bcrypt.hash('password', 10),
				token: 'test',
			},
		});
	}

	static async get(): Promise<User> {
		const user = await prismaClient.user.findFirst({
			where: {
				username: 'test',
			},
		});

		if (!user) {
			throw new Error('User is not found');
		}

		return user;
	}
}

export class ContactTest {
	static async delete() {
		await prismaClient.contact.deleteMany({
			where: {
				username: 'test',
			},
		});
	}

	static async create() {
		await prismaClient.contact.create({
			data: {
				first_name: 'test',
				last_name: 'test',
				email: 'test@test.com',
				phone: '628123456789',
				username: 'test',
			},
		});
	}

	static async get() {
		const contact = await prismaClient.contact.findFirst({
			where: {
				username: 'test',
			},
		});

		console.log(contact);

		if (!contact) {
			throw new Error('contact is not found');
		}

		return contact;
	}
}

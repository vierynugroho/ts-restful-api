import supertest from 'supertest';
import { ContactTest, UserTest } from './test-utils';
import { api } from '../src/app/api';
import { logger } from '../src/app/logger';

describe('POST /api/v1/contacts', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await ContactTest.delete();
		await UserTest.delete();
	});

	it('should create contact', async () => {
		const response = await supertest(api).post('/api/v1/contacts').set('X-API-TOKEN', 'test').send({
			first_name: 'viery',
			last_name: 'nugroho',
			email: 'viery15102002@gmail.com',
			phone: '08123456789',
		});

		expect(response.status).toBe(200);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.first_name).toBe('viery');
		expect(response.body.data.last_name).toBe('nugroho');
	});

	it('should reject create contact if data is invalid', async () => {
		const response = await supertest(api).post('/api/v1/contacts').set('X-API-TOKEN', 'test').send({
			first_name: 'viery',
			last_name: 'nugroho',
			email: 'viery15102002',
			phone: '08123456789',
		});

		expect(response.status).toBe(400);
		expect(response.body.status).toBe(false);
	});
});

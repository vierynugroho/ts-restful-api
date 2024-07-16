import supertest from 'supertest';
import { api } from '../src/app/api';
import { logger } from '../src/app/logger';
import { UserTest } from './test-utils';

describe('POST /api/v1/users', () => {
	afterEach(async () => {
		await UserTest.delete();
	});

	it('should reject register new user if request is invalid', async () => {
		const response = await supertest(api).post('/api/v1/users').send({
			username: '',
			password: '',
			name: '',
		});

		logger.info(response.body);

		expect(response.status).toBe(400);
		expect(response.body).toBeDefined();
	});

	it('should register new user', async () => {
		const response = await supertest(api).post('/api/v1/users').send({
			username: 'test',
			password: 'password',
			name: 'Test',
		});

		logger.info(response.body);

		expect(response.status).toBe(200);
		expect(response.body.response.data.username).toBe('test');
		expect(response.body.response.data.name).toBe('Test');
	});
});

describe('POST /api/v1/users/login', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it('should be able to login', async () => {
		const response = await supertest(api).post('/api/v1/users/login').send({
			username: 'test',
			password: 'password',
		});

		console.log(response.body.response);
		logger.info(response.body);

		expect(response.status).toBe(200);
		expect(response.body.response.data.name).toBe('test');
		expect(response.body.response.data.username).toBeDefined();
		expect(response.body.response.data._token).toBeDefined();
	});

	it('should be reject login user if wrong username or password', async () => {
		const response = await supertest(api).post('/api/v1/users/login').send({
			username: 'username',
			password: 'password',
		});

		console.log(response.body);
		logger.info(response.body);

		expect(response.status).toBe(401);
		expect(response.body.status).toBe(false);
		expect(response.body.response.data._token).toBe(undefined);
	});

	it('should be reject login user when validation error', async () => {
		const response = await supertest(api).post('/api/v1/users/login').send({
			username: '',
			password: 'password',
		});

		console.log(response.body);
		logger.info(response.body);

		expect(response.status).toBe(400);
		expect(response.body.status).toBe(false);
		expect(response.body.message).toBeDefined();
	});
});

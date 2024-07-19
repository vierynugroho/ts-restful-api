import supertest from 'supertest';
import { api } from '../src/app/api';
import { logger } from '../src/app/logger';
import { UserTest } from './test-utils';
import bcrypt from 'bcrypt';

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
		expect(response.body.data.username).toBe('test');
		expect(response.body.data.name).toBe('Test');
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
		expect(response.body.data.name).toBe('test');
		expect(response.body.data.username).toBeDefined();
		expect(response.body.data._token).toBeDefined();
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

describe('GET /api/v2/users/current', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it('should be able to get user', async () => {
		const response = await supertest(api).get('/api/v2/users/current').set('X-API-TOKEN', 'test');

		console.log(response.body);
		logger.info(response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.name).toBe('test');
		expect(response.body.data.username).toBeDefined();
	});

	it('should be reject get user if token is invalid', async () => {
		const response = await supertest(api).get('/api/v2/users/current').set('X-API-TOKEN', 'invalid');

		console.log(response.body);
		logger.info(response.body);

		expect(response.status).toBe(401);
		expect(response.body.status).toBe(false);
	});
});

describe('PATCH /api/v2/users/current', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it('should be reject to update user if request is invalid', async () => {
		const response = await supertest(api).patch('/api/v2/users/current').set('X-API-TOKEN', 'test').send({
			username: '',
			password: '',
			name: '',
		});

		console.log(response.body);
		logger.info(response.body);

		expect(response.status).toBe(400);
		expect(response.body.status).toBe(false);
	});

	it('should be able to update user name', async () => {
		const response = await supertest(api).patch('/api/v2/users/current').set('X-API-TOKEN', 'test').send({
			name: 'viery',
		});

		console.log(response.body);
		logger.info(response.body);

		expect(response.status).toBe(200);
		expect(response.body.status).toBe(true);
		expect(response.body.data.name).toBe('viery');
	});

	it('should be able to update user password', async () => {
		const response = await supertest(api).patch('/api/v2/users/current').set('X-API-TOKEN', 'test').send({
			password: 'updatepassword',
		});

		const user = await UserTest.get();

		console.log(response.body);
		logger.info(response.body);

		expect(response.status).toBe(200);
		expect(response.body.status).toBe(true);
		expect(await bcrypt.compare('updatepassword', user.password)).toBe(true);
	});
});

describe('DELETE /api/v2/users/current', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it('should be able to logout user', async () => {
		const response = await supertest(api).delete('/api/v2/users/current').set('X-API-TOKEN', 'test');

		console.log(response.body);
		logger.info(response.body);

		const user = await UserTest.get();

		expect(response.status).toBe(200);
		expect(response.body.status).toBe(true);
		expect(user.token).toBe(null);
	});

	it('should be reject to logout user', async () => {
		const response = await supertest(api).delete('/api/v2/users/current').set('X-API-TOKEN', 'invalid');

		console.log(response.body);
		logger.info(response.body);

		expect(response.status).toBe(401);
		expect(response.body.status).toBe(false);
	});
});

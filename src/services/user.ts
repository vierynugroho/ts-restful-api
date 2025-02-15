import { prismaClient } from '../app/database';
import { ResponseError } from '../errors/response';
import { CreateUserRequest, toUserResponse, UpdateUserRequest, UserResponse } from '../models/user';
import { UserValidation } from '../validations/user';
import { Validation } from '../validations/validation';
import { v4 as uuid } from 'uuid';

import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

export class UserService {
	static async register(request: CreateUserRequest): Promise<UserResponse> {
		const data = Validation.validate(UserValidation.REGISTER, request);

		const totalUserWithSameUsername = await prismaClient.user.count({
			where: {
				username: data.username,
			},
		});

		if (totalUserWithSameUsername != 0) {
			throw new ResponseError(400, 'username already has been taken');
		}

		data.password = await bcrypt.hash(data.password, 10);

		const user = await prismaClient.user.create({
			data,
		});

		return toUserResponse(user);
	}

	static async login(request: CreateUserRequest): Promise<UserResponse> {
		const data = Validation.validate(UserValidation.LOGIN, request);

		const foundUser = await prismaClient.user.findUnique({
			where: {
				username: data.username,
			},
		});

		if (!foundUser) {
			throw new ResponseError(401, 'username or password is wrong');
		}

		const isPasswordValid = await bcrypt.compare(data.password, foundUser.password);

		if (!isPasswordValid) {
			throw new ResponseError(401, 'username or password is wrong');
		}

		const user = await prismaClient.user.update({
			where: {
				username: data.username,
			},
			data: {
				token: uuid(),
			},
		});

		const response = toUserResponse(user);
		response.data._token = user.token!;
		return response;
	}

	static async get(user: User): Promise<UserResponse> {
		return toUserResponse(user);
	}

	static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
		const data = Validation.validate(UserValidation.UPDATE, request);

		if (data.name) {
			user.name = data.name;
		}

		if (data.username) {
			user.username = data.username;
		}

		if (data.password) {
			user.password = await bcrypt.hash(data.password, 10);
		}

		const update = await prismaClient.user.update({
			where: {
				username: user.username,
			},
			data: user,
		});

		return toUserResponse(update);
	}

	static async logout(user: User): Promise<UserResponse> {
		const logout = await prismaClient.user.update({
			where: {
				username: user.username,
			},
			data: {
				token: null,
			},
		});

		return toUserResponse(logout);
	}
}

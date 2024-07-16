import { User } from '@prisma/client';

export type UserResponse = {
	status: boolean;
	message: string;
	data: Data;
};

export type CreateUserRequest = {
	name: string;
	username: string;
	password: string;
};

export type LoginUserRequest = {
	username: string;
	password: string;
};

export type Data = {
	username: string;
	name: string;
	_token?: string;
};

export function toUserResponse(user: User): UserResponse {
	return {
		status: true,
		message: 'register successfully',
		data: {
			name: user.name,
			username: user.username,
		},
	};
}

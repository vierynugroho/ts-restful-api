import { z, ZodType } from 'zod';

export class UserValidation {
	static readonly REGISTER: ZodType = z.object({
		username: z.string().min(1).max(20),
		password: z.string().min(3),
		name: z.string().min(1).max(60),
	});

	static readonly LOGIN: ZodType = z.object({
		username: z.string().min(1).max(20),
		password: z.string().min(3),
	});

	static readonly UPDATE: ZodType = z.object({
		name: z.string().min(1).max(60).optional(),
		username: z.string().min(1).max(20).optional(),
		password: z.string().min(3).optional(),
	});
}

import { z, ZodType } from 'zod';

export class ContactValidation {
	static readonly CREATE: ZodType = z.object({
		first_name: z.string().min(1).max(20),
		last_name: z.string().min(1).max(20).optional(),
		email: z.string().min(1).email().optional(),
		phone: z.string().min(1).max(20).optional(),
	});
}

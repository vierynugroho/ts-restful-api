import { Contact } from '@prisma/client';

export type ContactResponse = {
	status: boolean;
	message: string;
	pagination?: Pagination;
	data: Datum;
};

export type Datum = {
	id: string;
	first_name: string;
	last_name?: string | null;
	email?: string | null;
	phone?: string | null;
};

export type Pagination = {
	current_page: number;
	total_page: number;
	total_items: number;
	size: number;
	next_page: null | number;
	prev_page: null | number;
};

export type CreateContactRequest = {
	first_name: string;
	last_name?: string;
	email?: string;
	phone?: string;
};

export type UpdateContactRequest = {
	id: string;
	first_name: string;
	last_name?: string;
	email?: string;
	phone?: string;
};

export function toContactResponse(contact: Contact): ContactResponse {
	return {
		status: true,
		message: 'successfully',
		data: {
			id: contact.id,
			first_name: contact.first_name,
			last_name: contact.last_name,
			email: contact.email,
			phone: contact.phone,
		},
	};
}

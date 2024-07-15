# Contact API Spec

## Create Contact

Endpoint : POST /api/v1/contacts

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"first_name": "vnonymous",
	"last_name": "password",
	"email": "viery@example.com",
	"phone": "6289123456"
}
```

Response Body (success):

```json
{
	"status": true,
	"message": "contact created successfully",
	"data": {
		"id": "string_id",
		"first_name": "vnonymous",
		"last_name": "password",
		"email": "viery@example.com",
		"phone": "6289123456"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "first_name must be not blank"
}
```

## Get Contact

Endpoint : GET /api/v1/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
	"status": true,
	"message": "contact data retrieved successfully",
	"data": [
		{
			"id": "string_id",
			"first_name": "vnonymous",
			"last_name": "password",
			"email": "viery@example.com",
			"phone": "6289123456"
		}
	]
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "contact is not found"
}
```

## Update Contact

Endpoint : PATCH /api/v1/contacts/:id

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"first_name": "new first_name",
	"last_name": "new password",
	"email": "viery@example.com",
	"phone": "6289123456"
}
```

Response Body (success):

```json
{
	"status": true,
	"message": "contact updated successfully",
	"data": {
		"id": "string_id",
		"first_name": "new first_name",
		"last_name": "new password",
		"email": "viery@example.com",
		"phone": "6289123456"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "first_name must be not blank"
}
```

## Remove Contact

Endpoint : DELETE /api/v1/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
	"status": true,
	"message": "contact deleted successfully"
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "unauthorized | contact is not found"
}
```

## Search Contact

Endpoint : GET /api/v1/contacts
Request Header :

- X-API-TOKEN : token

Query Parameters :

- name: [first_name, last_name] : string (optional)
- phone: string (optional)
- email: string (optional)
- page: number (default: 1)
- size: number (default: 10)

Response Body (success):

```json
{
	"status": true,
	"message": "contacts data retrieved successfully",
	"pagination": {
		"current_page": 1,
		"total_page": 10,
		"total_items": 100,
		"size": 10,
		"next_page": 2,
		"prev_page": null
	},
	"data": [
		{
			"id": "string_id",
			"first_name": "vnonymous",
			"last_name": "password",
			"email": "viery@example.com",
			"phone": "6289123456"
		},
		{
			"id": "string_id",
			"first_name": "anonymous",
			"last_name": "password",
			"email": "nugroho@example.com",
			"phone": "6289987654"
		}
	]
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "unauthorized"
}
```

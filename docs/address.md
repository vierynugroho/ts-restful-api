# Address API Spec

## Create Address

Endpoint : POST /api/v1/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"id": "string_id",
	"street": "Sukorame",
	"city": "Blitar",
	"province": "East Java",
	"country": "Indonesia",
	"postal_code": "66171"
}
```

Response Body (success):

```json
{
	"status": true,
	"message": "address created successfully",
	"data": {
		"id": "string_id",
		"street": "Sukorame",
		"city": "Blitar",
		"province": "East Java",
		"country": "Indonesia",
		"postal_code": "66171"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "city must be not blank"
}
```

## Get Address

Endpoint : GET /api/v1/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
	"status": true,
	"message": "address data retrieved successfully",
	"data": {
		"id": "string_id",
		"street": "Sukorame",
		"city": "Blitar",
		"province": "East Java",
		"country": "Indonesia",
		"postal_code": "66171"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "contact is not found"
}
```

## Update Address

Endpoint : PATCH /api/v1/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"id": "string_id",
	"street": "new street",
	"city": "new city",
	"province": "new province",
	"country": "new country",
	"postal_code": "new postal_code"
}
```

Response Body (success):

```json
{
	"status": true,
	"message": "address data updated successfully",
	"data": {
		"id": "string_id",
		"street": "new street",
		"city": "new city",
		"province": "new province",
		"country": "new country",
		"postal_code": "new postal_code"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "contact is not found"
}
```

## Remove Address

Endpoint : DELETE /api/v1/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
	"status": true,
	"message": "address deleted successfully"
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "unauthorized | Address is not found"
}
```

## List Address

Endpoint : GET /api/v1/contacts/:idContact/addresses

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
	"message": "Addresss data retrieved successfully",
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
	"message": "unauthorized | contact is not found"
}
```

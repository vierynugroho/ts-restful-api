# User API Spec

## Register User

Endpoint : POST /api/v1/users
Request Body :

```json
{
	"username": "vnonymous",
	"password": "password",
	"name": "Viery Nugroho"
}
```

Response Body (success):

```json
{
	"status": true,
	"message": "register successfully",
	"data": {
		"username": "vnonymous",
		"name": "Viery Nugroho"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "username must be not blank"
}
```

## Login User

Endpoint : POST /api/v1/users/login
Request Body :

```json
{
	"username": "vnonymous",
	"password": "password"
}
```

Response Body (success):

```json
{
	"status": true,
	"message": "login successfully",
	"data": {
		"username": "vnonymous",
		"name": "Viery Nugroho",
		"_token": "random_token_nich"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "username or password wrong"
}
```

## Get User

Endpoint : GET /api/v1/users/current

Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
	"status": true,
	"message": "user data retrieved successfully",
	"data": {
		"username": "vnonymous",
		"name": "Viery Nugroho"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "unauthorized"
}
```

## Update User

Endpoint : PATCH /api/v1/users/current
Request Body :

```json
{
	"name": "new name",
	"username": "vnonymous_",
	"password": "password"
}
```

Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
	"status": true,
	"message": "user data updated successfully",
	"data": {
		"name": "new name",
		"username": "vnonymous_",
		"password": "new password"
	}
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/v1/users/current
Request Header :

- X-API-TOKEN : token

Response Body (success):

```json
{
	"status": true,
	"message": "logout successfully"
}
```

Response Body (Failed)

```json
{
	"status": false,
	"message": "unauthorized"
}
```

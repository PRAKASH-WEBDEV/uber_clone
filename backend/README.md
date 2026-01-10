# Users API — Register Endpoint ✅

## POST /users/register

**Description**

Register a new user and return an authentication token (JWT) plus the created user object.

**URL**

`POST /users/register`

**Headers**

- `Content-Type: application/json`

---

## Request body (JSON)

Example:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password1"
}
```

**Field requirements & validation** 🔧

- `fullname.firstname` (string) — required, minimum 3 characters
- `fullname.lastname` (string) — required, minimum 3 characters
- `email` (string) — required, valid email format
- `password` (string) — required, length 6–12 characters

> ⚠️ Note: Current route validation in `user.routes.js` enforces `fullname.firstname`, `email`, and `password`. The code expects `fullname.lastname` when creating the user, but `lastname` is not validated by express-validator in the current implementation — ensure you provide it.

---

## Responses

- **201 Created** ✅
  - Body example:

```json
{
  "user": {
    "_id": "<userId>",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com"
  },
  "token": "<jwt-token>"
}
```

- **400 Bad Request** (validation error) ⚠️
  - Returned when `express-validator` finds invalid/missing fields.
  - Example: `{ "errors": [ { "msg": "Enter a valid email address", "param": "email", "location": "body" } ] }`

- **409 Conflict** (email already exists) ⚠️
  - If the `email` violates the unique constraint, the database may return a conflict/error.

- **500 Internal Server Error** ❌
  - For unexpected errors (e.g., DB failure). The controller forwards errors to the global error handler.

---

## Example curl

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Doe"},"email":"jane.doe@example.com","password":"password1"}'
```

---

If you want, I can add more endpoints to this doc or update validation to explicitly check `lastname` as well. 💡

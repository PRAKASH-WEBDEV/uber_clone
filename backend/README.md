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


## POST /users/login

**Description**

Authenticate a user and return a JSON Web Token (JWT) plus the authenticated user object.

**URL**

`POST /users/login`

**Headers**

- `Content-Type: application/json` 🔧

---

## Request body (JSON)

Example:

```json
{
  "email": "jane.doe@example.com",
  "password": "password1"
}

Field requirements & validation 🔍

email (string) — required, valid email format
password (string) — required, length 6–12 characters
⚠️ Note: The current route validation in user.routes.js enforces email and password using express-validator.

Responses
200 OK ✅
Body example:


{
  "user": {
    "_id": "<userId>",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com"
  },
  "token": "<jwt-token>"
}


400 Bad Request ⚠️
Validation errors from express-validator. Example:
{ "errors": [ { "msg": "Enter a valid email address", "param": "email", "location": "body" } ] }
401 Unauthorized 🔒
Invalid credentials: { "message": "Invalid email or password" }
500 Internal Server Error ❌
Unexpected errors (DB failure, etc.)
💡 Tip: The implementation uses .select('+password') to verify credentials; ensure the response omits the hashed password before returning the user object (e.g., remove password from the returned object).


---

### 🔧 How to apply
- Option A — manual: open [README.md](http://_vscodecontentref_/4), paste the section above where appropriate (I recommend placing it after the register docs).
- Option B — I can produce a patch file or the exact git diff for you to apply — tell me which you prefer.

---

### 💡 Optional follow-ups
- Add express-validator check for [fullname.lastname](http://_vscodecontentref_/5) in `routes/user.routes.js` (the model requires it).
- Apply a small controller change to remove [password](http://_vscodecontentref_/6) from the `login` response—I can prepare that patch too.

Would you like me to:
1) apply the patch text here as a `.patch` you can apply, or  
2) also prepare the small controller change and include both patches now? ✅
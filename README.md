# Authentication API

This is a Node.js authentication API with JWT token-based authentication, Google OAuth, and various protected routes.

## Authentication Endpoints

### Register
```
POST /auth/register
```
Body:
```json
{
  "userName": "example",
  "email": "example@example.com",
  "password": "password123"
}
```

### Login
```
POST /auth/login
```
Body:
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

### Logout
```
POST /auth/logout
```
Headers:
```
Authorization: Bearer <your_jwt_token>
```

### Google Login
```
POST /auth/google-login
```
Body:
```json
{
  "idToken": "<google_id_token>"
}
```

## Protected Routes

All protected routes require the following header:
```
Authorization: Bearer <your_jwt_token>
```

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Products
- `GET /products` - Get all products

### Cart
- `POST /cart/add` - Add item to cart

## Images
- `POST /images/upload` - Upload an image
- `PUT /images/update` - Update an image
- `DELETE /images/delete` - Delete an image
# ChatApp API Documentation

---

## User API

### POST `/api/user/signup`

Registers a new user.

#### **Request Body**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword",
  "bio": "Hi, I'm John!"
}
```

#### **Responses**

- **200 OK**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "token": "<jwt_token>",
    "userData": { /* user object */ }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "success": false,
    "message": "All fields are required"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```

---

### POST `/api/user/login`

Logs in a user.

#### **Request Body**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### **Responses**

- **200 OK**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "<jwt_token>",
    "userData": { /* user object */ }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "success": false,
    "message": "All fields are required"
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "success": false,
    "message": "Invalid credentials"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```

---

### GET `/api/user/update-profile`

Updates the profile of the authenticated user.  
**Protected:** Requires JWT token (cookie or header).

#### **Request Body**
```json
{
  "fullName": "Jane Doe",
  "bio": "Updated bio",
  "profilePic": "https://..."
}
```

#### **Responses**

- **200 OK**
  ```json
  {
    "success": true,
    "message": "Profile updated",
    "user": { /* updated user object */ }
  }
  ```
- **401 Unauthorized**
  ```json
  {
    "success": false,
    "message": "Unauthorized User, Token not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```

---

## Message API

### GET `/api/message/users`

Returns all users except the logged-in user, with unseen message counts.  
**Protected:** Requires JWT token.

#### **Responses**

- **200 OK**
  ```json
  {
    "success": true,
    "users": [ /* user objects */ ],
    "unseenMessage": { "userId": count }
  }
  ```
- **401 Unauthorized / 500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```

---

### GET `/api/message/:id`

Returns all messages between the logged-in user and user with `:id`.  
**Protected:** Requires JWT token.

#### **Responses**

- **200 OK**
  ```json
  {
    "success": true,
    "messages": [ /* message objects */ ]
  }
  ```
- **401 Unauthorized / 500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```

---

### PUT `/api/message/mark/:id`

Marks the message with `_id` as seen.  
**Protected:** Requires JWT token.

#### **Responses**

- **200 OK**
  ```json
  {
    "success": true,
    "message": "Message marked as seen"
  }
  ```
- **401 Unauthorized / 500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```

---

## Status API

### GET `/api/status`

Checks if the server is running.

#### **Responses**

- **200 OK**
  ```
  Server is Running
  ```

---

## Notes

- All protected routes require a valid JWT token (sent via cookies or headers).
- For image uploads, send the image as a base64 string in the request body.
- All responses are in JSON format unless otherwise noted.
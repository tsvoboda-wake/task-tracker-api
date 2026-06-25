# Task Tracker API

## Description

A simple application for task item management for authenticated users.

## Main features

- User registration
- User login
- For authenticated users:
  - Task creation
  - Task management (update and delete)
  - View all tasks for authenticated user

## Technologies

- Postman
- MongoDB Atlas
- Mongoose
- Express
- RESTful API
- Nodejs
- Javascript

### Dependencies

|              |                                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| bcryptjs     | Used to encrypt user password for safe storage                                |
| dotenv       | Used to read variables from `.env` file                                       |
| express      | Used for routing and RESTful api endpoints                                    |
| jsonwebtoken | Used to verify JWT token during user authentication                           |
| mongodb      | Used to connect to MongoDB Database                                           |
| mongoose     | Framework used to employ Schemas and Models used in conjunction with MongoDB  |
| nodemon      | Used for development to automatically restart the local server on code change |

## Local setup instructions

### Prerequisites

- Create a MongoDB Atlas
  - Create and Connect to database cluster
  - Copy the Connection URI for later use in `.env` file
- Create a Postman account
  - Create a Collection of endpoints that will be used for testing
    - See requirements in `API Route Overview` section
- Install npm
- Install node.js
- Install VS Code

### Setup

- Pull down the Github repository and cd into it
- Run `npm install`
- Create a `.env` file in the project's root
  - Supply with values in `Required Environment Variables`
- Run `node server.js` or `npm run dev` to start the server and begin testing

## Required Environment Variables

The following variables should be supplied in `.env` in the project's root.

|            |                                                       |
| ---------- | ----------------------------------------------------- |
| PORT=3000  | Port used when running server on localhost            |
| MONGO_URI  | Connection URI used to connect MongoBD Atlas Database |
| JWT_SECRET | String used to verify JWT Token                       |

## API Route Overview

### POST /api/auth/register

Registers a user, adding the new user object to the Users database.

On success, returns a success message, the user object, and the Authorization header required for Task requests.

Request body (all fields required):

```
{
  "name": String,
  "email": String,
  "password": String
}
```

### POST /api/auth/login

Authenticates an existing user.

On success, returns a success message, the user object, and the Authorization header required for Task requests.

Request body (all fields required):

```
{
  "email": String,
  "password": String
}
```

### POST /api/tasks

Creates a single task for an authenticated user.

Request header:

```
Authorization: Bearer <token retrieved from register or login response>
```

Request body (all fields required):

```
{
  "title": String,
  "description": String,
  "completed": Boolean
}
```

### GET /api/tasks

Retrieves all tasks created by the currently authenticated user.

Request header:

```
Authorization: Bearer <token retrieved from register or login response>
```

### PUT /api/tasks/:id

Updates a single task for an authenticated user.

Request header:

```
Authorization: Bearer <token retrieved from register or login response>
```

Request body (no fields required, any or all may be included to update those values in the Task database entry):

```
{
  "title": String,
  "description": String,
  "completed": Boolean
}
```

### DELETE /api/tasks/:id

Deletes a single task for an authenticated user.

Replace `:id` with the desired task `_id` value returned from get tasks response.

Request header:

```
Authorization: Bearer <token retrieved from register or login response>
```

## Testing Notes

- When testing in Postman, use the Headers tab, not Authorization tab.
- Make sure the Authorization tab is not populated with any values (including vault variables) as this will override the Authorization Header and not return the appropriate response.
- If running into issues with Tasks endpoints, check the Task database entry `user` value against the `_id` in the User database entry and confirm the values match.

## Any known issues or future improvements

Possible future improvements:

- On new task creation, assign a simpler id value (ie. length of task list +1) versus auto-generated string.
- Add a list all users endpoint for testing ease (currently looking up user credentials in MongoDB Atlas).

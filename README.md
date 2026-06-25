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

| bcryptjs | Used to encrypt user password for safe storage |
| dotenv | Used to read variables from `.env` file |
| express | Used for routing and RESTful api endpoints |
| jsonwebtoken | Used to verify JWT token during user authentication |
| mongodb | Used to connect to MongoDB Database |
| mongoose | Framework used to employ Schemas and Models used in conjunction with MongoDB |
| nodemon | Used for development to automatically restart the local server on code change |

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

| PORT=3000  | Port used when running server on localhost |
| MONGO_URI  | Connection URI used to connect MongoBD Atlas Database |
| JWT_SECRET | String used to verify JWT Token |

## API Route Overview

### POST /api/auth/register

### POST /api/auth/login

### POST /api/tasks

### GET /api/tasks

### PUT /api/tasks/:id

### DELETE /api/tasks/:id

## Testing Notes

## Any known issues or future improvements
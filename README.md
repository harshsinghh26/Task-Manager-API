# User Authentication System

A secure user authentication system built using Node.js, Express, and MongoDB. This system ensures safe user registration, login, and session management using JWT authentication and encrypted passwords.

# Task Manager API

A full-featured Task Management API built using Node.js, Express, and MongoDB. This project includes user authentication and authorization, allowing users to manage their personal to-do tasks securely.

## Features
- **User Registration & Login** with JWT Authentication
- **Task CRUD Operations**: Create, Read, Update, and Delete personal tasks
- **Secure Route Protection**: Only the authenticated user can access their tasks
- **User-Specific Task Management**: Tasks are linked to each logged-in user
- **Meaningful API Responses** for success and errors

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Testing**: Postman

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/harshsinghh26/Task-Manager-API.git
   cd Task-Manager-API
   
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=8000
   DB_URL=your_mongodb_connection_string
   CORS = your_cors_url
   ACCESS_TOKEN_SECRET = your_secret_key
   ACCESS_TOKEN_EXPIRY = set expiry
   REFRESH_TOKEN_SECRET = your_secret_key
   REFRESH_TOKEN_EXPIRY = set_expiry
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
### Authentication
- **POST** `/api/v1/users/register` - Register a new user
- **POST** `/api/v1/users/login` - Login with email and password
- **POST** `/api/v1/users/logout` - Logout Current User
- **POST** `/api/v1/task/createtask` - Create Task
- **GET** `/api/v1/task/getalltask` - Get All Task
- **GET** `/api/v1/task/gettaskbyid/:id` - Get Task By Id
- **PUT** `/api/v1/task/update/:id` - Update Task Details
- **PUT** `/api/v1/task/delete/:id` - Delete Task

## Testing
Use **Postman** or any API client to test the endpoints.

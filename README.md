Transactions App API
A backend API built with Node.js, Express, and MongoDB for managing users and transactions. The API supports user registration, login, and transaction management with JWT-based authentication and secure data handling.

Features
User registration and login with input validation.
JWT-based user authentication.
CRUD operations for managing transactions.
Request data validation with express-validator.
Authentication middleware for protecting routes.
Middleware for logging and request tracking.
Technologies Used
Backend:
Node.js: JavaScript runtime for building the server-side logic.
Express.js: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing user and transaction data.
Mongoose: ODM library for interacting with MongoDB in Node.js.
JWT (JSON Web Tokens): Used for secure user authentication.
Bcrypt.js: For hashing passwords.
Express Validator: Middleware for request data validation.
Frontend:
React: Library for building user interfaces.
React Router: For handling routing and navigation.
Axios: For making HTTP requests to the backend.
react-chart: For displaying bar charts and other visualizations.
validator.js: For client-side input validation.
Context API: For managing global authentication state.
Project Structure
Models:
user-model.js: Schema and logic for user data.
product-model.js: Schema and logic for transaction data.
Controllers:
users-cltr.js: Handles user registration, login, and profile retrieval.
product-cltr.js: Manages CRUD operations and transaction logic.
Middlewares:
authenticateUser.js: Verifies JWT tokens for protected routes.
Logging middleware: Tracks incoming requests for debugging and auditing.

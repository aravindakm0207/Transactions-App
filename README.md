# Transactions-App

 #Introduction
 
Transactions App API built using Node.js, Express, and MongoDB.
Backend for managing users and transactions, allowing user registration, login, and transactions.
Features
User registration and login with validation.
JWT-based authentication.
CRUD operations for appointments.
Validation of user input using express-validator.
Middleware for authentication.
Logging middleware for request tracking.

Technologies Used

Node.js: JavaScript runtime for building server-side applications.
Express.js: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing user and transaction data.
Mongoose: ODM library for MongoDB and Node.js.
JWT (JSON Web Tokens): For user authentication.
Bcrypt.js: For password hashing.
Express Validator: Middleware for validating request data.

MVC Structure

Models: Define data structure and handle database interactions.
user-model.js: User schema.
product-model.js: Product schema.
Controllers: Handle transactions logic and interact with models.
users-cltr.js: Functions for user registration, login, and account retrieval.
product-cltr.js: Functions for managing product transactions.
Middlewares: Functions executing during request-response cycle.
authenticateUser.js: Middleware for authenticating users.

Technologies Used

React: Front-end library for building user interfaces.
React Router: For routing and navigation.
Axios: For making HTTP requests.
react-chart: For displaying bar chart.
validator.js: For input validation.
Context API: For managing authentication state.
Error Handling: Client-side validation with user-friendly messages.

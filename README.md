# PlatePerfect

## Introduction

PlatePerfect is a web application designed to help users manage their food lists, create meals, and develop meal plans. Whether you're looking to organize your dietary habits or streamline your meal preparation. This project aims to provide a user-friendly platform for creating, managing, and tracking meals and meal plans.

## Getting Started

Follow these instructions to get a copy of PlatePerfect up and running on your local machine.

### 1. Installation Process

1. **Clone the repository:**

   ```bash
    git clone https://github.com/EvelinaKar/Food_tracker_app
   ```

2. **Install dependencies for the backend::**

   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
Create a .env file in the backend directory with the following content:

   ```bash
   PORT=
   MONGO_URI=your_mongodb_uri
   MONGO_DATABASE=your_mongodb_db
   AUTH_SECRET_KEY=your_jwt_secret
   ```

5. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend server:**

   ```bash
   cd ../frontend
   npm run dev
   ```

### 2. Software Dependencies

- Express.js
- Node.js
- React
- MongoDB

### 3. Latest Releases

For information on the latest releases and new features, please refer to the Releases section on GitHub.

### 4. API References

**User Authentication**
- POST /auth/register - Register a new user
- POST /auth/login - Authenticate a user and get a token

**Food Items**
- POST /api/create-food - Create a new food item for the authenticated user
- GET /api/my-foods - Get all food items for the authenticated user
- DELETE /api/delete-food/:id - Delete a food item for the authenticated user

**Meals**
- POST /api/create-meal - Create a new meal for the authenticated user
- GET /api/my-meals - Get all meals for the authenticated user
- GET /api/meal/:id - Get a specific meal by ID for the authenticated user
- PUT /api/update-meal/:id - Update a meal by ID for the authenticated user
- DELETE /api/delete-meal/:id - Delete a meal by ID for the authenticated user

**Meal Plans**
- POST /api/create-meal-plan - Create a new meal plan for the authenticated user
- GET /api/my-meal-plans - Get all meal plans for the authenticated user
- PUT /api/update-meal-plan/:id - Update a meal plan by ID for the authenticated user
- DELETE /api/delete-meal-plan/:id - Delete a meal plan by ID for the authenticated user
  

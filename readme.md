# Todo React App

The Todo React App is a full-stack task management application that allows you to add new tasks, mark tasks as completed, and remove tasks from your list. The application uses Express.js and MongoDB for the backend and React.js for the frontend.

## Installation

Follow these steps to set up the Todo React App on your local machine:

### Backend (Express.js and MongoDB)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HardikChoudhary24/Todo-React-App.git
   ```

2. **Navigate to the backend project directory:**

   ```bash
   cd server
   ```

3. **Install backend dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the backend project root and add the following:

   ```env
   MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
   ```

   Replace `YOUR_MONGODB_CONNECTION_STRING_HERE` with your MongoDB connection string.

5. **Start the backend server:**

   ```bash
   npm run devStart
   ```

### Frontend (React.js)

1. **Navigate to the project home directory:**

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend development server:**

   ```bash
   npm run dev
   ```

4. The frontend application will be accessible at [http://localhost:5173/Todo-React-App/](http://localhost:5173/Todo-React-App/).

Now you have both the backend and frontend of the Todo React App running locally.

## Features

- Add new tasks to your todo list.
- Mark tasks as completed.
- Remove tasks from the list.
- Keep track of your tasks easily.

## Technologies Used

### Backend

- Express.js
- MongoDB
- Node.js

### Frontend

- React.js
- HTML/CSS
- Vanilla CSS (Custom styling)

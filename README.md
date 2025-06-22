# MedCare – Medication Management System

This is a full-stack **Medication Management** application built with a **React frontend** and a **Node.js + SQLite backend**.  
The app allows **patients** to log their medication intake and **caretakers** to track their adherence in real-time through synced data.

---

## Features Implemented

### User Authentication
- Secure **Signup** and **Login** with hashed passwords (bcrypt)
- JWT-based authentication
- JWT is stored in **cookies** on the frontend

### Role-Based Functionality
- Users have roles: **patient** or **caretaker**
- **Patients** can mark medications as taken for a specific day
- **Caretakers** can view dates when a patient took their medications (synced via DB)

### Medication Tracking
- **Taken dates** are stored in a SQLite DB
- Data reflects in both the Patient and Caretaker dashboards
- All updates happen via real-time API fetches (not mock data)

---

## Technologies Used

- **Frontend:** React, React Router DOM, React Query, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, SQLite3, JWT, Bcrypt, CORS
- **Testing:** (Optional – Vitest, React Testing Library)

---

## Backend Setup Instructions

### Location:
Your backend should be located inside the `/backend` folder.

### Steps:

1. Navigate to the backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create .env file:
  ```
  SECRET_KEY=your_jwt_secret_key
  ```
4. Run the backend server:
  ```
node app.js
```
### Database:
SQLite file: medCare.db (auto-created)

You must create two tables manually in the DB (or through code):
```
-- users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
);

-- dates table
CREATE TABLE IF NOT EXISTS dates (
  date_id TEXT PRIMARY KEY,
  taken_date TEXT
);
```
## Frontend Setup Instructions
The React app is inside the /frontend folder.
```
cd frontend
npm install
npm run dev
```
### API Connection:
The frontend connects to the backend via http://localhost:3000

Make sure CORS is enabled in the backend

### Authentication Details
  Passwords are hashed using bcrypt before being stored in the DB

  JWT tokens are generated on login and stored in cookies

  Backend uses express.json() and cors() middleware for safe communication
## Notes
  Ensure the backend is running before using the frontend.

  The environment variable SECRET_KEY is required for JWT generation.

  The app uses real-time data from the database only for dates and signing in, and signing up.

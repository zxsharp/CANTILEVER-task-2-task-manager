# Full Stack Task Manager
# (Task - 2)

## Live Links

**Frontend (vercel)**: [https://task-manager-zxsharp.vercel.app/tasks](https://task-manager-zxsharp.vercel.app/tasks)

**Backend (render)**: [https://cantilever-task-2-task-manager.onrender.com](https://cantilever-task-2-task-manager.onrender.com)

> **Note**: Backend is hosted on Render's free tier, which puts the server to sleep after some time of inactivity. If you experience any errors, please wait 1-2 minutes for the server to wake up.

## Features

- **User Authentication**: Secure signup/login with JWT cookies
- **Task Management**: Create, read, update, delete tasks
- **Advanced Filtering**: Filter by status, priority, search by title
- **Sorting**: Sort tasks by creation date, due date, priority
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Client and server-side validation with Zod
- **Toast Notifications**: User-friendly feedback for all actions

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Date-fns** for date handling

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Zod** for validation
- **Bcrypt** for password hashing
- **CORS** for cross-origin requests

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB

## 📁 Project Structure

```
task-2/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── config/         # API configuration
│   │   └── context/        # context api for state management
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── config          # database connection
│   │   └── index.ts       # Entry point
│   └── package.json
└── README.md
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

## Environment Variables

### Backend
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend
- `VITE_API_URL` - Backend API URL

## UI Components

- **TaskCard**: Individual task display with actions
- **TaskForm**: Modal form for creating/editing tasks
- **TaskFilters**: Advanced filtering and sorting controls
- **Navbar**: Navigation with user info and logout
- **Loading States**: Smooth loading animations

## Authentication Flow

1. User signs up or logs in
2. Server generates JWT token
3. Token stored in HTTP-only cookie
4. Cookie sent with each request for authentication
5. Protected routes verify token via middleware

## Design

- Tailwinds mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interfaces
- Optimized for all screen sizes
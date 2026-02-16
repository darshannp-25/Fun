# FullStack Fun App

A complete Full Stack Web Application with Authentication and Dashboard.

## Features
- **Frontend**: Next.js 14 (App Router), TailwindCSS, TypeScript.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Authentication**: JWT-based login/register with protected routes.
- **Dashboard**: CRUD operations for tasks, search functionality.
- **Security**: Password hashing (bcryptjs), JWT validation, Input validation.

## Prerequisites
- Node.js (v18+)
- MongoDB (running locally or cloud URI)

## Installation

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Modify `MONGO_URI` if your MongoDB is not running on localhost:27017.
4. Run the server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:3000`.

## API Testing
- Use the provided `postman_collection.json` to verify API endpoints.
- Base URL: `http://localhost:5000/api`

## Scaling
See [SCALING.md](./SCALING.md) for details on scaling the application for production.

## Technology Stack
- **Next.js**: For server-side rendering and client-side routing.
- **Express**: For a flexible and fast backend API.
- **MongoDB**: For scalable document storage.
- **TailwindCSS**: For rapid UI development.

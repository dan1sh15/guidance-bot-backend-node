# GuidanceBot - AI-powered Career Counseling & Emotional Support Platform

GuidanceBot is an AI-powered career counseling and emotional support platform that helps individuals make informed career decisions and provides emotional support during challenging times. The platform offers personalized career guidance through AI-driven insights, job recommendations, and wellness support.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- AI-powered career counseling
- Personalized job recommendations based on user skills and interests
- Emotional support through chatbots
- User authentication with JWT
- User profile management

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, Context
- **Authentication**: JWT (JSON Web Tokens)
- **Miscellaneous**: bcrypt (for password hashing), cors, dotenv, etc.

## Folder Structure
```
backend/
├── config/
│ └── database.js # Database configuration
├── controllers/
│ ├── Auth.js # Admin-related logic
├── middleware/
│ └── Auth.js # Authentication middleware
├── models/
│ ├── User.js # User model
├── routes/
│ ├── userRoutes.js # User routes
├── .env # Environment variables
├── index.js
```

## Project Setup

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (>= 14.x.x)
- MongoDB (MongoDB Atlas)
- Postman or a similar API testing tool

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dan1sh15/guidance-bot-backend-node

# Pathshala Backend API

A comprehensive backend API for the Pathshala learning application built with Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication & Authorization
- 📚 Learning Path Management
- 📊 Progress Tracking
- 🧠 Quiz System
- 📄 ATS Resume Analysis
- 📈 User Statistics
- 🔒 Security & Rate Limiting

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:lessonName` - Get specific lesson
- `GET /api/lessons/:lessonName/content` - Get lesson content
- `GET /api/lessons/:lessonName/quiz` - Get lesson quiz
- `GET /api/lessons/:lessonName/access` - Check lesson access

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress/:lessonName` - Update lesson progress
- `GET /api/progress/stats` - Get user statistics

### Quiz
- `POST /api/quiz/:lessonName/submit` - Submit quiz answers
- `GET /api/quiz/:lessonName/history` - Get quiz history

### ATS Analysis
- `POST /api/ats/analyze` - Analyze resume against job description
- `GET /api/ats/history` - Get analysis history

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start MongoDB:
```bash
mongod
```

4. Run the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

## Database Schema

### User
- Personal information
- Learning path progress
- Streak tracking
- Preferences

### Lesson
- Lesson content
- Quiz questions
- Prerequisites
- Difficulty levels

### Progress
- User progress tracking
- Quiz attempts
- Completion status
- Time spent

### ATSResult
- Resume analysis results
- Job description matching
- Improvement suggestions

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

ISC License 
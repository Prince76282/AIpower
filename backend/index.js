

// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();


// Import passport configuration
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

/* ------------------ Security middleware ------------------ */
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true
}));

/* ------------------ Session middleware ------------------- */
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

/* ------------------ Passport init ------------------------ */
app.use(require('passport').initialize());
app.use(require('passport').session());

/* ------------------ Rate limiting ------------------------ */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

/* ------------------ Body parsing ------------------------- */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ------------------ MongoDB connection ------------------- */
// ✅ Removed deprecated useNewUrlParser & useUnifiedTopology
mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb+srv://princethakur76676:princethakur76676@cluster0.teutych.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

/* ------------------ Routes -------------------------------- */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/ats', require('./routes/ats'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/userdata', userRoutes);

/* ------------------ Health check ------------------------- */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Pathshala API is running',
    timestamp: new Date().toISOString()
  });
});

/* ------------------ Error handling ----------------------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

/* ------------------ 404 handler -------------------------- */
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

/* ------------------ Start server ------------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📚 Pathshala API ready for learning!');
});

module.exports = app;

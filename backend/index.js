

// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


// Import passport configuration
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

/* ------------------ Security middleware ------------------ */
app.use(helmet());
// CORS: allow requests from frontend in production, but during development
// accept any origin (useful for mobile devices / emulators). Change as needed.
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? (process.env.FRONTEND_URL || 'http://localhost:8081') : true,
  credentials: true,
};
app.use(cors(corsOptions));

// Request logging — useful to see incoming requests when debugging network issues
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

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

/* ------------------ Static uploads & ensure dir ----------- */
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

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
// Lightweight ping endpoint for mobile/emulator reachability tests
app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'pong', host: req.hostname, ip: req.ip });
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

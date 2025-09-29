const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  avatar: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Google OAuth fields
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  learningPath: {
    currentLesson: {
      type: String,
      default: 'Print'
    },
    completedLessons: [{
      lessonName: String,
      completedAt: Date,
      score: Number
    }],
    streak: {
      type: Number,
      default: 0
    },
    lastActiveDate: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Hash password before saving (only if password exists)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Update streak method
userSchema.methods.updateStreak = function() {
  const today = new Date();
  const lastActive = new Date(this.learningPath.lastActiveDate);
  const diffTime = Math.abs(today - lastActive);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    this.learningPath.streak += 1;
  } else if (diffDays > 1) {
    this.learningPath.streak = 1;
  }
  
  this.learningPath.lastActiveDate = today;
  return this.save();
};

module.exports = mongoose.model('User', userSchema); 
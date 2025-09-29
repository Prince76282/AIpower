const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  lessonName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  quizAttempts: [{
    attemptNumber: Number,
    score: Number,
    answers: [{
      questionIndex: Number,
      selectedAnswer: Number,
      isCorrect: Boolean
    }],
    completedAt: Date,
    timeSpent: Number // in seconds
  }],
  bestScore: {
    type: Number,
    default: 0
  },
  completionDate: {
    type: Date,
    default: null
  },
  timeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  notes: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for efficient queries
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);

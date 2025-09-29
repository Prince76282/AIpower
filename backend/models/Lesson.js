const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  prerequisites: [{
    type: String,
    ref: 'Lesson'
  }],
  content: {
    theory: String,
    examples: [{
      title: String,
      code: String,
      description: String
    }],
    exercises: [{
      question: String,
      solution: String,
      hint: String
    }]
  },
  quiz: {
    questions: [{
      question: {
        type: String,
        required: true
      },
      options: [{
        type: String,
        required: true
      }],
      correctIndex: {
        type: Number,
        required: true
      },
      explanation: String
    }],
    passingScore: {
      type: Number,
      default: 75
    },
    timeLimit: {
      type: Number,
      default: 300 // 5 minutes in seconds
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedTime: {
    type: Number, // in minutes
    default: 30
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);

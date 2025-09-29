const mongoose = require('mongoose');

const atsResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeContent: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  analysis: {
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    keywordScore: Number,
    formattingScore: Number,
    contentScore: Number,
    matchedKeywords: [String],
    missingKeywords: [String],
    improvements: [String],
    suggestions: [{
      category: String,
      priority: String,
      description: String
    }]
  },
  files: {
    resumeFileName: String,
    jobDescriptionFileName: String,
    resumeFileUrl: String,
    jobDescriptionFileUrl: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ATSResult', atsResultSchema);
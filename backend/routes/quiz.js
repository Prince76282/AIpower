const express = require('express');
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');

const router = express.Router();

// Submit quiz answers
router.post('/:lessonName/submit', auth, async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    
    const lesson = await Lesson.findOne({ name: req.params.lessonName });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    const quizResults = answers.map((answer, index) => {
      const question = lesson.quiz.questions[index];
      const isCorrect = answer === question.correctIndex;
      if (isCorrect) correctAnswers++;
      
      return {
        questionIndex: index,
        selectedAnswer: answer,
        isCorrect
      };
    });

    const score = Math.round((correctAnswers / lesson.quiz.questions.length) * 100);
    const passed = score >= lesson.quiz.passingScore;

    // Save quiz attempt
    let progress = await Progress.findOne({
      userId: req.userId,
      lessonId: lesson._id
    });

    if (!progress) {
      progress = new Progress({
        userId: req.userId,
        lessonId: lesson._id,
        lessonName: lesson.name
      });
    }

    const attemptNumber = progress.quizAttempts.length + 1;
    progress.quizAttempts.push({
      attemptNumber,
      score,
      answers: quizResults,
      completedAt: new Date(),
      timeSpent: timeSpent || 0
    });

    if (score > progress.bestScore) {
      progress.bestScore = score;
    }

    if (passed) {
      progress.status = 'completed';
      progress.completionDate = new Date();
    }

    await progress.save();

    res.json({
      message: 'Quiz submitted successfully',
      result: {
        score,
        passed,
        correctAnswers,
        totalQuestions: lesson.quiz.questions.length,
        attemptNumber,
        bestScore: progress.bestScore
      }
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz history
router.get('/:lessonName/history', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ name: req.params.lessonName });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const progress = await Progress.findOne({
      userId: req.userId,
      lessonId: lesson._id
    });

    if (!progress) {
      return res.json({ attempts: [] });
    }

    res.json({ attempts: progress.quizAttempts });
  } catch (error) {
    console.error('Get quiz history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
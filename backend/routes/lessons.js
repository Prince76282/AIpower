const express = require('express');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find({ isActive: true })
      .sort({ order: 1 })
      .select('name title description icon order prerequisites difficulty estimatedTime');

    res.json({ lessons });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get lesson by name
router.get('/:lessonName', async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ 
      name: req.params.lessonName,
      isActive: true 
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ lesson });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get lesson content
router.get('/:lessonName/content', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ 
      name: req.params.lessonName,
      isActive: true 
    }).select('content');

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ content: lesson.content });
  } catch (error) {
    console.error('Get lesson content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get lesson quiz
router.get('/:lessonName/quiz', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ 
      name: req.params.lessonName,
      isActive: true 
    }).select('quiz');

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ quiz: lesson.quiz });
  } catch (error) {
    console.error('Get lesson quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if user can access lesson
router.get('/:lessonName/access', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ 
      name: req.params.lessonName,
      isActive: true 
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check prerequisites
    if (lesson.prerequisites && lesson.prerequisites.length > 0) {
      const userProgress = await Progress.find({
        userId: req.userId,
        lessonName: { $in: lesson.prerequisites },
        status: 'completed'
      });

      if (userProgress.length !== lesson.prerequisites.length) {
        return res.json({ 
          canAccess: false, 
          message: 'Complete prerequisite lessons first',
          prerequisites: lesson.prerequisites
        });
      }
    }

    res.json({ canAccess: true });
  } catch (error) {
    console.error('Check lesson access error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
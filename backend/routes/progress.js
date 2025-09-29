const express = require('express');
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId })
      .populate('lessonId', 'name title description icon order')
      .sort({ 'lessonId.order': 1 });

    res.json({ progress });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lesson progress
router.post('/:lessonName', auth, async (req, res) => {
  try {
    const { status, timeSpent, notes } = req.body;
    
    const lesson = await Lesson.findOne({ name: req.params.lessonName });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

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

    progress.status = status;
    if (timeSpent) progress.timeSpent += timeSpent;
    if (notes) progress.notes.push({ content: notes });

    if (status === 'completed') {
      progress.completionDate = new Date();
    }

    await progress.save();

    // Update user's current lesson
    if (status === 'completed') {
      const user = await User.findById(req.userId);
      const completedLessons = await Progress.find({
        userId: req.userId,
        status: 'completed'
      }).populate('lessonId', 'name order');

      const nextLesson = await Lesson.findOne({
        order: { $gt: lesson.order },
        isActive: true
      }).sort({ order: 1 });

      if (nextLesson) {
        user.learningPath.currentLesson = nextLesson.name;
      }

      await user.save();
    }

    res.json({ 
      message: 'Progress updated successfully',
      progress 
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalLessons = await Lesson.countDocuments({ isActive: true });
    const completedLessons = await Progress.countDocuments({
      userId: req.userId,
      status: 'completed'
    });
    
    const totalTimeSpent = await Progress.aggregate([
      { $match: { userId: req.userId } },
      { $group: { _id: null, totalTime: { $sum: '$timeSpent' } } }
    ]);

    const user = await User.findById(req.userId);

    res.json({
      stats: {
        totalLessons,
        completedLessons,
        completionRate: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
        totalTimeSpent: totalTimeSpent[0]?.totalTime || 0,
        streak: user.learningPath.streak,
        currentLesson: user.learningPath.currentLesson
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

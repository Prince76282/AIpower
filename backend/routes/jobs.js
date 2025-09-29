const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Get job categories (for future expansion)
router.get('/categories', (req, res) => {
  const categories = [
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'marketing', name: 'Marketing', icon: '📈' },
    { id: 'design', name: 'Design', icon: '🎨' }
  ];
  
  res.json({ categories });
});

// Get job search suggestions (for future expansion)
router.get('/suggestions', auth, (req, res) => {
  const suggestions = [
    'Software Developer',
    'Data Analyst',
    'Product Manager',
    'UX Designer',
    'Marketing Specialist',
    'Sales Representative',
    'Project Manager',
    'Business Analyst'
  ];
  
  res.json({ suggestions });
});

module.exports = router;
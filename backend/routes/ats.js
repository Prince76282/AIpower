const express = require('express');
const ATSResult = require('../models/ATSResult');
const auth = require('../middleware/auth');

const router = express.Router();

// Analyze resume against job description
router.post('/analyze', auth, async (req, res) => {
  try {
    const { resumeContent, jobDescription, files } = req.body;

    if (!resumeContent || !jobDescription) {
      return res.status(400).json({ message: 'Resume content and job description are required' });
    }

    // Enhanced ATS analysis algorithm
    const analysis = await performATSAnalysis(resumeContent, jobDescription);

    // Save analysis result
    const atsResult = new ATSResult({
      userId: req.userId,
      resumeContent,
      jobDescription,
      analysis,
      files: files || {}
    });

    await atsResult.save();

    res.json({
      message: 'ATS analysis completed',
      result: analysis
    });
  } catch (error) {
    console.error('ATS analysis error:', error);
    res.status(500).json({ message: 'Server error during analysis' });
  }
});

// Get user's ATS analysis history
router.get('/history', auth, async (req, res) => {
  try {
    const results = await ATSResult.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('analysis.score analysis.improvements files createdAt');

    res.json({ results });
  } catch (error) {
    console.error('Get ATS history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enhanced ATS Analysis Function
async function performATSAnalysis(resumeContent, jobDescription) {
  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeContent);
  
  // Calculate keyword match score
  const jobKeywordList = Object.keys(jobKeywords);
  const matchedKeywords = jobKeywordList.filter(keyword => resumeKeywords[keyword]);
  const missingKeywords = jobKeywordList.filter(keyword => !resumeKeywords[keyword]);
  
  const keywordScore = (matchedKeywords.length / jobKeywordList.length) * 40;
  
  // Calculate formatting score
  let formattingScore = 0;
  if (resumeContent.includes('@')) formattingScore += 10; // Email
  if (resumeContent.includes('phone') || resumeContent.includes('mobile')) formattingScore += 10; // Phone
  if (resumeContent.includes('experience') || resumeContent.includes('work')) formattingScore += 10; // Experience section
  if (resumeContent.includes('education') || resumeContent.includes('degree')) formattingScore += 10; // Education section
  if (resumeContent.includes('skill') || resumeContent.includes('technical')) formattingScore += 10; // Skills section
  
  // Calculate content quality score
  let contentScore = 0;
  const actionWords = ['achieved', 'developed', 'implemented', 'managed', 'led', 'created', 'improved', 'increased', 'reduced', 'optimized'];
  const actionWordCount = actionWords.filter(word => resumeContent.toLowerCase().includes(word)).length;
  contentScore = Math.min(actionWordCount * 5, 30);
  
  const totalScore = Math.min(Math.round(keywordScore + formattingScore + contentScore), 100);
  
  // Generate improvement suggestions
  const improvements = [];
  const suggestions = [];
  
  if (keywordScore < 20) {
    improvements.push(`Add more job-relevant keywords. You're missing: ${missingKeywords.slice(0, 5).join(', ')}`);
    suggestions.push({
      category: 'Keywords',
      priority: 'High',
      description: 'Include more keywords from the job description'
    });
  }
  
  if (formattingScore < 30) {
    improvements.push("Improve resume structure - ensure you have clear sections for contact info, experience, education, and skills");
    suggestions.push({
      category: 'Formatting',
      priority: 'Medium',
      description: 'Improve resume structure and formatting'
    });
  }
  
  if (contentScore < 15) {
    improvements.push("Use more action verbs to describe your achievements (e.g., 'achieved', 'developed', 'implemented')");
    suggestions.push({
      category: 'Content',
      priority: 'Medium',
      description: 'Use more action verbs and quantify achievements'
    });
  }
  
  if (totalScore < 50) {
    improvements.push("Consider tailoring your resume more specifically to this job description");
    suggestions.push({
      category: 'Overall',
      priority: 'High',
      description: 'Tailor resume more specifically to this job'
    });
  }
  
  if (totalScore >= 80) {
    improvements.push("Great job! Your resume is well-optimized for this position");
    suggestions.push({
      category: 'Overall',
      priority: 'Low',
      description: 'Resume is well-optimized, minor tweaks only'
    });
  }
  
  return {
    score: totalScore,
    keywordScore: Math.round(keywordScore),
    formattingScore,
    contentScore,
    matchedKeywords: matchedKeywords.slice(0, 10),
    missingKeywords: missingKeywords.slice(0, 10),
    improvements,
    suggestions
  };
}

// Extract keywords function
function extractKeywords(text) {
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'];
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
}

module.exports = router; 
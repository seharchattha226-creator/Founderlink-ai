
const mongoose = require('mongoose');
const AIRequest = require('../models/AIRequest');
const { trackIdeaGenerated, trackStartupAnalyzed, trackRoadmapCreated } = require('../services/statsStore');
const asyncHandler = require('../utils/asyncHandler');

const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Generate startup idea
// @route   POST /api/ai/generate-idea
// @access  Private
const generateIdea = asyncHandler(async (req, res) => {
  console.log('[AI Controller] generateIdea called');
  console.log('[AI Controller] Request body:', req.body);
  console.log('[AI Controller] User:', req.user?.id || req.user?._id);

  const { industry, problem, targetAudience } = req.body;

  if (!industry || !problem) {
    console.log('[AI Controller] Validation failed: missing industry or problem');
    return res.status(400).json({
      success: false,
      message: 'Please provide industry and problem',
    });
  }

  // Generate mock idea
  const idea = {
    title: `${industry} Solution for ${problem}`,
    description: `A platform that addresses ${problem} by providing innovative tools specifically designed for the ${industry} industry.`,
    targetAudience: targetAudience || `${industry} professionals and businesses`,
    uniqueValueProposition: `First-to-market solution combining AI-powered automation with deep ${industry} expertise`,
    businessModel: [
      'Subscription-based premium features',
      'Freemium model with basic features free',
      'Enterprise licensing',
    ],
    marketOpportunity: 'Growing market with increasing demand for digital transformation',
    challenges: [
      'Building initial user base',
      'Establishing credibility in the industry',
      'Continuous feature development',
    ],
    nextSteps: [
      'Conduct market research',
      'Build MVP',
      'Get early feedback from 10-20 users',
      'Iterate based on feedback',
    ],
  };

  console.log('[AI Controller] Generated idea:', idea);

  // Save to MongoDB if available
  if (isMongoConnected()) {
    try {
      console.log('[AI Controller] Saving to MongoDB');
      await AIRequest.create({
        type: 'idea',
        input: { industry, problem, targetAudience },
        output: idea,
        userId: req.user._id || req.user.id,
      });
      console.log('[AI Controller] Saved to MongoDB successfully');
    } catch (dbError) {
      console.warn('[AI Controller] Failed to save AI request to MongoDB:', dbError.message);
    }
  } else {
    console.log('[AI Controller] MongoDB not connected, using in-memory store');
    trackIdeaGenerated();
  }

  console.log('[AI Controller] Sending response');
  res.status(200).json({
    success: true,
    data: idea,
  });
});

// @desc    Analyze startup
// @route   POST /api/ai/analyze-startup
// @access  Private
const analyzeStartup = asyncHandler(async (req, res) => {
  console.log('[AI Controller] analyzeStartup called');
  console.log('[AI Controller] Request body:', req.body);
  console.log('[AI Controller] User:', req.user?.id || req.user?._id);

  const { startupName, businessModel, market, competitors } = req.body;

  if (!startupName || !businessModel) {
    console.log('[AI Controller] Validation failed: missing startupName or businessModel');
    return res.status(400).json({
      success: false,
      message: 'Please provide startupName and businessModel',
    });
  }

  const analysis = {
    startupName,
    overallScore: Math.floor(Math.random() * 30) + 70,
    strengths: [
      'Innovative approach to the problem',
      'Clear business model',
      'Addressing a real market need',
    ],
    weaknesses: [
      'Need to validate product-market fit',
      'Potential for competitor response',
      'Requires significant initial investment',
    ],
    opportunities: [
      'Market growth trends are favorable',
      'Potential for strategic partnerships',
      'Option to expand to adjacent markets',
    ],
    threats: [
      'Market competition intensifying',
      'Regulatory changes in the industry',
      'Economic uncertainty affecting funding',
    ],
    recommendations: [
      'Focus on core product features first',
      'Build strong relationships with early adopters',
      'Create a compelling value proposition',
      'Plan for scalable infrastructure early',
    ],
    marketFitScore: Math.floor(Math.random() * 20) + 80,
    teamScore: Math.floor(Math.random() * 20) + 75,
    productScore: Math.floor(Math.random() * 25) + 70,
  };

  console.log('[AI Controller] Generated analysis:', analysis);

  if (isMongoConnected()) {
    try {
      console.log('[AI Controller] Saving to MongoDB');
      await AIRequest.create({
        type: 'analysis',
        input: { startupName, businessModel, market, competitors },
        output: analysis,
        userId: req.user._id || req.user.id,
      });
      console.log('[AI Controller] Saved to MongoDB successfully');
    } catch (dbError) {
      console.warn('[AI Controller] Failed to save AI request to MongoDB:', dbError.message);
    }
  } else {
    console.log('[AI Controller] MongoDB not connected, using in-memory store');
    trackStartupAnalyzed();
  }

  console.log('[AI Controller] Sending response');
  res.status(200).json({
    success: true,
    data: analysis,
  });
});

// @desc    Generate roadmap
// @route   POST /api/ai/roadmap
// @access  Private
const generateRoadmap = asyncHandler(async (req, res) => {
  console.log('[AI Controller] generateRoadmap called');
  console.log('[AI Controller] Request body:', req.body);
  console.log('[AI Controller] User:', req.user?.id || req.user?._id);

  const { productIdea, timeline } = req.body;

  if (!productIdea) {
    console.log('[AI Controller] Validation failed: missing productIdea');
    return res.status(400).json({
      success: false,
      message: 'Please provide productIdea',
    });
  }

  const timelineMonths = parseInt(timeline) || 6;
  console.log('[AI Controller] Using timeline:', timelineMonths, 'months');

  const roadmap = {
    productIdea,
    timelineMonths,
    milestones: [
      {
        phase: 'Discovery & Planning',
        duration: '1 month',
        objectives: [
          'Market research',
          'Define product requirements',
          'Create wireframes',
          'Set up development environment',
        ],
        deliverables: [
          'Market research report',
          'Product requirements document',
          'Wireframes and mockups',
          'Development plan',
        ],
      },
      {
        phase: 'MVP Development',
        duration: `${Math.max(timelineMonths - 2, 1)} months`,
        objectives: [
          'Build core features',
          'Implement user authentication',
          'Create basic UI',
          'Set up analytics',
        ],
        deliverables: [
          'Minimum viable product (MVP)',
          'User authentication system',
          'Basic user dashboard',
          'Analytics integration',
        ],
      },
      {
        phase: 'Testing & Launch',
        duration: '1 month',
        objectives: [
          'Beta testing with 20-50 users',
          'Bug fixes and improvements',
          'Prepare launch materials',
          'Official launch',
        ],
        deliverables: [
          'Tested and stable product',
          'User feedback report',
          'Launch plan executed',
          'Product live',
        ],
      },
    ],
    keyMetrics: [
      'Monthly Active Users (MAU)',
      'Customer Acquisition Cost (CAC)',
      'Lifetime Value (LTV)',
      'Churn rate',
      'User engagement',
    ],
  };

  console.log('[AI Controller] Generated roadmap:', roadmap);

  if (isMongoConnected()) {
    try {
      console.log('[AI Controller] Saving to MongoDB');
      await AIRequest.create({
        type: 'roadmap',
        input: { productIdea, timeline },
        output: roadmap,
        userId: req.user._id || req.user.id,
      });
      console.log('[AI Controller] Saved to MongoDB successfully');
    } catch (dbError) {
      console.warn('[AI Controller] Failed to save AI request to MongoDB:', dbError.message);
    }
  } else {
    console.log('[AI Controller] MongoDB not connected, using in-memory store');
    trackRoadmapCreated();
  }

  console.log('[AI Controller] Sending response');
  res.status(200).json({
    success: true,
    data: roadmap,
  });
});

// @desc    Get AI request history
// @route   GET /api/ai/history
// @access  Private
const getHistory = asyncHandler(async (req, res) => {
  console.log('[AI Controller] getHistory called');
  console.log('[AI Controller] User:', req.user?.id || req.user?._id);

  let history = [];

  if (isMongoConnected()) {
    try {
      console.log('[AI Controller] Fetching history from MongoDB');
      history = await AIRequest.find({
        userId: req.user._id || req.user.id,
      }).sort({ createdAt: -1 }).limit(20);
      console.log('[AI Controller] Found', history.length, 'records');
    } catch (dbError) {
      console.warn('[AI Controller] Failed to get AI history from MongoDB:', dbError.message);
    }
  }

  console.log('[AI Controller] Sending response');
  res.status(200).json({
    success: true,
    data: history,
  });
});

module.exports = {
  generateIdea,
  analyzeStartup,
  generateRoadmap,
  getHistory,
};

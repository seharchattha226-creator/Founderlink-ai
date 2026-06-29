
const mongoose = require('mongoose');
const User = require('../models/User');
const AIRequest = require('../models/AIRequest');
const { getStats: getInMemoryStats } = require('../services/statsStore');
const { getTotalUsers } = require('../services/userStore');
const asyncHandler = require('../utils/asyncHandler');

const isMongoConnected = () => {
  return false;
};

// Get dashboard stats
const getDashboardStats = asyncHandler(async (req, res) => {
  let totalUsers = 0;
  let ideasGenerated = 0;
  let startupsAnalyzed = 0;
  let roadmapsCreated = 0;
  let recentActivities = [];

  try {
    if (isMongoConnected()) {
      // Get stats from MongoDB
      totalUsers = await User.countDocuments();
      ideasGenerated = await AIRequest.countDocuments({ type: 'idea' });
      startupsAnalyzed = await AIRequest.countDocuments({ type: 'analysis' });
      roadmapsCreated = await AIRequest.countDocuments({ type: 'roadmap' });
      recentActivities = await AIRequest.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select('type createdAt');
    } else {
      // Get stats from in-memory
      const inMemoryStats = getInMemoryStats();
      totalUsers = getTotalUsers();
      ideasGenerated = inMemoryStats.ideasGenerated;
      startupsAnalyzed = inMemoryStats.startupsAnalyzed;
      roadmapsCreated = inMemoryStats.roadmapsCreated;
      recentActivities = inMemoryStats.recentActivities;
    }
  } catch (dbError) {
    console.warn('Failed to get dashboard stats, falling back to in-memory:', dbError.message);
    const inMemoryStats = getInMemoryStats();
    totalUsers = getTotalUsers();
    ideasGenerated = inMemoryStats.ideasGenerated;
    startupsAnalyzed = inMemoryStats.startupsAnalyzed;
    roadmapsCreated = inMemoryStats.roadmapsCreated;
    recentActivities = inMemoryStats.recentActivities;
  }

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      ideasGenerated,
      startupsAnalyzed,
      roadmapsCreated,
      recentActivities,
    },
  });
});

module.exports = {
  getDashboardStats,
};

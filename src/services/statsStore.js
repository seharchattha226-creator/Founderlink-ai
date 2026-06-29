
// In-memory stats storage
let stats = {
  totalUsers: 0,
  ideasGenerated: 0,
  startupsAnalyzed: 0,
  roadmapsCreated: 0,
  recentActivities: [],
};

// Track user registration
const trackUserRegistered = () => {
  stats.totalUsers++;
};

// Track idea generation
const trackIdeaGenerated = () => {
  stats.ideasGenerated++;
  addActivity('idea', 'New startup idea generated');
};

// Track startup analysis
const trackStartupAnalyzed = () => {
  stats.startupsAnalyzed++;
  addActivity('analysis', 'Startup analyzed');
};

// Track roadmap creation
const trackRoadmapCreated = () => {
  stats.roadmapsCreated++;
  addActivity('roadmap', 'Roadmap created');
};

// Add activity to recent activities list
const addActivity = (type, description) => {
  const newActivity = {
    _id: Date.now().toString(),
    type,
    description,
    createdAt: new Date(),
  };
  
  // Keep only last 10 activities
  stats.recentActivities.unshift(newActivity);
  if (stats.recentActivities.length > 10) {
    stats.recentActivities.pop();
  }
};

// Get all stats
const getStats = () => {
  return { ...stats };
};

module.exports = {
  trackUserRegistered,
  trackIdeaGenerated,
  trackStartupAnalyzed,
  trackRoadmapCreated,
  getStats,
};

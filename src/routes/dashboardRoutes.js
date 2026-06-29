
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getDashboardStats } = require('../controllers/dashboardController');

const router = express.Router();

// All dashboard routes are protected
router.use(protect);

// Get dashboard stats
router.get('/stats', getDashboardStats);

module.exports = router;

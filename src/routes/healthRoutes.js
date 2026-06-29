const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const mongoose = require('mongoose');

const router = express.Router();

router.get(
  '/health',
  asyncHandler(async (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatusMap = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting',
    };
    const dbStatus = dbStatusMap[dbState] || 'Unknown';

    res.status(200).json({
      success: true,
      message: 'FounderLink AI API is running',
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        host: mongoose.connection.host || 'Not connected',
        name: mongoose.connection.name || 'Not connected',
      },
    });
  })
);

module.exports = router;

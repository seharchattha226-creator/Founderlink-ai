// Load environment variables FIRST (Updated)
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('🚀 Starting FounderLink AI Backend...');
    console.log('ℹ️ Using in-memory storage for this session');

    // Start the server without MongoDB
    const server = app.listen(PORT, () => {
      console.log('✅========================================');
      console.log('✅ Server Started Successfully!');
      console.log('✅ Mode:', process.env.NODE_ENV);
      console.log('✅ Port:', PORT);
      console.log('✅ Health Check: http://localhost:' + PORT + '/api/health');
      console.log('✅========================================');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
      console.error('❌ Unhandled Rejection:', err.message);
    });

  } catch (error) {
    console.error('❌ Server Startup Failed!', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

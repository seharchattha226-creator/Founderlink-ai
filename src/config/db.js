const mongoose = require('mongoose');

let dbInstance = null;

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;
  let connected = false;

  // Try real MongoDB first
  if (mongoUri) {
    try {
      console.log('🔄 Connecting to real MongoDB...');
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 10000,
      });
      dbInstance = conn;
      connected = true;
      console.log('✅========================================');
      console.log('✅ MongoDB Connected Successfully!');
      console.log('✅ Host:', conn.connection.host);
      console.log('✅ Database Name:', conn.connection.name);
      console.log('✅========================================');
      return conn;
    } catch (error) {
      console.warn('⚠️ Real MongoDB connection failed, trying in-memory MongoDB...');
    }
  }

  // Try in-memory MongoDB
  if (!connected) {
    try {
      console.log('🔄 Connecting to in-memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      });
      dbInstance = conn;
      
      console.log('✅========================================');
      console.log('✅ MongoDB Connected Successfully!');
      console.log('✅ Host:', conn.connection.host);
      console.log('✅ Database Name:', conn.connection.name);
      console.log('✅========================================');
      return conn;
    } catch (memoryError) {
      console.error('❌========================================');
      console.error('❌ MongoDB Connection Failed!');
      console.error('❌========================================');
      console.error('❌ Error Message:', memoryError.message);
      console.error('❌ Error Code:', memoryError.code);
      console.error('❌========================================');
      throw memoryError;
    }
  }
};

const getDB = () => dbInstance;

module.exports = { connectDB, getDB };

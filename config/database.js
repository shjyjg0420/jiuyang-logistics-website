const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jiuyang-logistics';
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`📦 Database connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Database disconnected');
  } catch (error) {
    console.error(`Error disconnecting database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };

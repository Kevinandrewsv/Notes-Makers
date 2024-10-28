const mongoose = require('mongoose');

const dbConnect = async () => {
  const connectionString = process.env.MONGODB_URI;
  try {
    await mongoose.connect(connectionString);
    console.log('Database connection established successfully..');
  } catch (error) {
    console.log('Unable to establish connection with the Database', error);
  }
};

module.exports = dbConnect;

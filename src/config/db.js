const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const mongouri = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(mongouri);
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("MongoDb connected failed");
    process.exit(1);
  }
};

module.exports = connectDb;

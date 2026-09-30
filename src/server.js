const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDb = require("./config/db");
const mongoose = require("mongoose");

const startServer = async () => {
  try {
    await connectDb();
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server running on PORT ` + process.env.PORT);
    });
  } catch (error) {
    console.log("Failed to start server", error.message);
    process.exit(1);
  }
};

startServer();

const app = require("./app");

const connectDB = require("./config/db");

const { port } = require("./config/env");

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down...`);

      server.close(async () => {
        const mongoose = require("mongoose");

        await mongoose.connection.close();

        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));

    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Server startup failed:", error.message);

    process.exit(1);
  }
}

startServer();

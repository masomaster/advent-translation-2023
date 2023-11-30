const mongoose = require("mongoose");

// Retry mechanism for establishing the initial database connection without connection errors before the serverless function cold start
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function connectWithRetries() {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(process.env.DATABASE_URL);

      const db = mongoose.connection;

      db.on("connected", function () {
        console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
      });

      return;
    } catch (error) {
      console.error("Error connecting to the database:", error);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }

  throw new Error("Exceeded maximum number of retries for database connection");
}

connectWithRetries();

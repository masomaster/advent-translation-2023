const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.DATABASE_URL);

  const db = mongoose.connection;

  db.on("connected", function () {
    console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
  });
} catch (error) {
  console.error("Error connecting to the database:", error);
}

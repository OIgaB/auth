import "dotenv/config";
import mongoose from "mongoose";

import app from "./app.js";

const { DB_HOST, PORT } = process.env;

if (!DB_HOST) {
  console.error("DB_HOST environment variable is not defined.");
  process.exit(1);
}

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    const actualPort = PORT || 3001;

    app.listen(actualPort, () => {
      console.log(
        `Database connection successful. Server running on port: ${actualPort}`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

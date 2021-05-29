import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { connectTODB } from "./database/connection.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

connectTODB(DB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});

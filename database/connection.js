import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.DB_URI;

export const connectTODB = () => {
  console.log(DB_URI);
};

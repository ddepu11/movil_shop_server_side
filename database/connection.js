import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.DB_URI;

export const connectTODB = async () => {
  const connection = await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

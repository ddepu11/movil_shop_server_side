import mongoose from "mongoose";

export const connectTODB = async (DB_URI) => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

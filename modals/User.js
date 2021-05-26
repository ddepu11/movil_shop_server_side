import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      isRequired: true,
    },
    lastName: {
      type: String,
      isRequired: true,
    },
    phoneNumber: {
      type: Number,
      isRequired: true,
      unique: true,
    },
    email: {
      type: String,
      isRequired: true,
      unique: true,
    },
    password: {
      type: String,
      isRequired: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

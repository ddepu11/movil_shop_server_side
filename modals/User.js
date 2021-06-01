import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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
    role: {
      type: String,
      isRequired: false,
      default: 'USER',
    },
    tokens: [
      {
        token: {
          type: String,
          isRequired: false,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const secret = process.env.TOKEN_SECRET;
  const token = await jwt.sign({ _id: this.id }, secret);

  this.tokens = [...this.tokens, { token }];
  this.save();

  return token;
};

const User = mongoose.model('User', userSchema);

export default User;

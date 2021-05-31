import mongoose from 'mongoose';

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
  },
  { timestamps: true }
);

// // Runs after saving the doc
// userSchema.post('save', function (doc, next) {
//   next();
// });

// // Runs before saving the doc
// userSchema.pre('save', function (next) {
//   next();
// });

const User = mongoose.model('User', userSchema);

export default User;

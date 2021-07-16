import mongoose from 'mongoose';

const { Schema } = mongoose;

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

    displayPicture: {
      type: String,
      default: 'displayPicture.png',
      isRequired: false,
    },

    gender: {
      type: String,
      isRequired: true,
    },

    cart: [
      {
        mobileId: {
          type: String,
          isRequired: true,
        },

        picture: {
          type: String,
          isRequired: true,
        },

        title: {
          type: String,
          isRequired: true,
        },

        color: {
          type: String,
          isRequired: true,
        },

        sellerName: {
          type: String,
          isRequired: true,
        },

        sellerId: {
          type: String,
          isRequired: true,
        },

        price: {
          type: String,
          isRequired: true,
        },

        quantity: {
          type: Number,
          isRequired: true,
          default: 1,
        },
      },
    ],

    deliveryAddress: {
      state: { type: String, isRequired: false },

      city: { type: String, isRequired: false },

      pincode: { type: Number, isRequired: false },

      address: { type: String, isRequired: false },
    },
  },

  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

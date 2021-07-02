import mongoose from 'mongoose';

const mobileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      isRequired: true,
      unique: true,
    },

    price: {
      type: Number,
      isRequired: true,
    },

    brand: {
      type: String,
      isRequired: true,
    },

    stars: {
      type: Number,
      default: 0,
      isRequired: false,
    },

    internalMemory: {
      type: Number,
      isRequired: true,
    },

    ram: {
      type: String,
      isRequired: true,
    },

    os: {
      type: String,
      isRequired: true,
    },

    battery: {
      type: String,
      isRequired: true,
    },

    processor: {
      type: String,
      isRequired: true,
    },

    camera: {
      type: String,
      isRequired: true,
    },

    colors: {
      type: Array,
      isRequired: true,
    },

    pictures: {
      type: Array,
      isRequired: true,
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      isRequired: true,
    },

    sellerInfo: {
      name: { type: String },
      email: { type: String },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        isRequired: true,
      },
    },

    movilShopAssured: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
  },

  { timestamps: true }
);

const Mobile = mongoose.model('Mobile', mobileSchema);

export default Mobile;

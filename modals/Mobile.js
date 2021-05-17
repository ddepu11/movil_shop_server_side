import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
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
  },
  internalMemory: {
    type: Number,
    isRequired: true,
  },
  colors: {
    type: Array,
    isRequired: true,
  },
});

const Mobile = mongoose.model("Mobile", mobileSchema);

export default Mobile;

import { Schema, Model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    isRequired: true,
  },
  price: {
    type: Number,
    isRequired: true,
  },
});

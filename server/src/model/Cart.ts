import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CartSchema = new Schema({
    cartId: String,
    lineItems: [{
      productId: String,
      name: String,
      description: String,
      price: Number,
      thumbnail: String,
      images: Array,
      quantity: Number,
    }],
  },
  {
    timestamps: true,
  }
);
export const Cart = model("Cart", CartSchema);

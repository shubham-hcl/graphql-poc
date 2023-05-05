import mongoose from "mongoose";
const { Schema, model } = mongoose;

let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = model("Item", ItemSchema);

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lineItems: [ItemSchema],
    subTotal: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
export const Cart = model("Cart", CartSchema);

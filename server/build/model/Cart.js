"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.Item = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
let ItemSchema = new Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
exports.Item = model("Item", ItemSchema);
const CartSchema = new Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    lineItems: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number,
    },
}, {
    timestamps: true,
});
exports.Cart = model("Cart", CartSchema);

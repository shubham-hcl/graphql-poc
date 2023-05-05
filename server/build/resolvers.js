"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("./mocks/cart");
const uuidv4_1 = require("uuidv4");
const User_1 = __importDefault(require("./model/User"));
const getCart = (args) => {
    const id = args.id;
    if (id === cart_1.cart.id) {
        return cart_1.cart;
    }
};
const updateQuantity = ({ id, lineItemId, quantity }) => {
    cart_1.cart.lineItems.map((lineItem) => {
        if (lineItem.lineItemId === lineItemId) {
            lineItem.quantity = quantity;
            return lineItem;
        }
    });
    return cart_1.cart;
};
const login = ({ email, password }) => {
    if (email && password) {
        return {
            token: (0, uuidv4_1.uuid)(),
        };
    }
    return null;
};
const createUser = ({ name, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default({
        name,
        email,
        password
    });
    const createUser = yield user.save();
    return Object.assign(Object.assign({}, createUser._doc), { _id: createUser._id.toString() });
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield User_1.default.find();
    users = users.map((q) => {
        return Object.assign(Object.assign({}, q._doc), { _id: q._id.toString() });
    });
    return users;
});
// Root resolver
const resolvers = {
    cart: getCart,
    updateQuantity: updateQuantity,
    login: login,
    createUser: createUser,
    users: getAllUsers
};
exports.default = resolvers;

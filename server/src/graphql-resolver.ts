import { cart } from "./mocks/cart";
import { uuid } from "uuidv4";
import User from "./model/User";
import Product from "./model/Product";

const getCart = (args: any) => {
  const id = args.id;
  if (id === cart.id) {
    return cart;
  }
};

const updateQuantity = ({ id, lineItemId, quantity }: any) => {
  cart.lineItems.map((lineItem: any) => {
    if (lineItem.lineItemId === lineItemId) {
      lineItem.quantity = quantity;
      return lineItem;
    }
  });
  return cart;
};

const login = ({ email, password }: any) => {
  if (email && password) {
    return {
      token: uuid(),
    };
  }
  return null;
};

const createUser = async ({ name, email, password }: any) => {
  const user = new User({
    name,
    email,
    password,
  });
  const createUser: any = await user.save();
  return {
    ...createUser._doc,
    _id: createUser._id.toString(),
  };
};

const getAllUsers = async () => {
  let users: any = await User.find();
  users = users.map((q: any) => {
    return {
      ...q._doc,
      _id: q._id.toString(),
    };
  });
  return users;
};

const createProduct = async ({ productInput }: any) => {
  console.log(productInput);
  const product = new Product(productInput);
  const createProduct: any = await product.save();
  return {
    ...createProduct._doc,
    _id: createProduct._id.toString(),
  };
};

// Root resolver
const resolvers = {
  cart: getCart,
  updateQuantity: updateQuantity,
  login: login,
  createUser: createUser,
  users: getAllUsers,
  createProduct: createProduct,
};

export default resolvers;

import User from "../model/User";
import Product from "../model/Product";

const createUser = async ({ name, email, password }: any) => {
  const user = new User({
    name,
    email,
    password,
  });
  const createUser: any = await user.save();
  const newUser = {
    ...createUser._doc,
    _id: createUser._id.toString(),
  };
  return newUser;
};

const getAllUsers = async ({ id }: any) => {
  let users: any = await User.find();
  users = users.map((q: any) => {
    return {
      ...q._doc,
      _id: q._id.toString(),
    };
  });
  users = id ? users.filter((user: any) => user._id === id) : users;
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

const updateProduct = async ({ id, productInput }: any) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product Not found!");
  }
  product.name = productInput?.name ? productInput.name : product.name;
  product.description = productInput?.description
    ? productInput.description
    : product.description;
  product.price = productInput?.price ? productInput?.price : product.price;
  product.image = productInput?.image ? productInput.image : product.image;

  const updatedProduct: any = await product.save();
  return {
    ...updatedProduct._doc,
    _id: updatedProduct._id.toString(),
  };
};

const deleteProduct = async ({ id }: any) => {
  const product: any = await Product.findById(id);
  if (!product) {
    throw new Error("Product Not found!");
  }
  await Product.findByIdAndRemove(id);
  return {
    ...product._doc,
    _id: product._id.toString(),
  };
};

const getAllProducts = async () => {
  let products: any = await Product.find();
  products = products.map((q: any) => {
    return {
      ...q._doc,
      _id: q._id.toString(),
    };
  });
  return products;
};

// Root resolver
const resolvers = {
  createUser: createUser,
  users: getAllUsers,
  createProduct: createProduct,
  products: getAllProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};

export default resolvers;

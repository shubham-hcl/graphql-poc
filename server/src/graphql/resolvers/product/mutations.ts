import Product from "../../../model/Product";

const productMutations = {
  createProduct: async (parent: any, { productInput }: any, context: any) => {
    const product = new Product(productInput);
    const createProduct: any = await product.save();
    return {
      ...createProduct._doc,
      _id: createProduct._id.toString(),
    };
  },

  updateProduct: async (
    parent: any,
    { id, productInput }: any,
    context: any
  ) => {
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
  },

  deleteProduct: async (parent: any, { id }: any, context: any) => {
    const product: any = await Product.findById(id);
    if (!product) {
      throw new Error("Product Not found!");
    }
    await Product.findByIdAndRemove(id);
    return {
      ...product._doc,
      _id: product._id.toString(),
    };
  },
};

export default productMutations;

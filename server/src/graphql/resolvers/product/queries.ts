import Product from "../../../model/Product";

const productQueries = {
  products: async () => {
    let products: any = await Product.find();
    products = products.map((q: any) => {
      return {
        ...q._doc,
        _id: q._id.toString(),
      };
    });
    return products;
  },
  product: async (parent: any, { productId }: any, context: any) => {
    let product: any = await Product.findOne({ productId });
    return product;
  },
};

export default productQueries;

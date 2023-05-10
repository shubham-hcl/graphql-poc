import { Cart } from "../../../model/Cart";

const cartQueries = {
  cart: async (parent: any, { cartId }: any, context: any) => {
    let cart: any = await Cart.findOne({ cartId });
    return cart;
  },
};

export default cartQueries;

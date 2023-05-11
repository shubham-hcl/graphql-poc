import { cart } from "../../../mocks/cart";
import { Cart } from "../../../model/Cart";

const cartQueries = {
  cart: async (parent: any, { cartId }: any, context: any) => {
    let cart: any = await Cart.findOne({ cartId });
    const totalPrice = cart.lineItems.reduce((accumulator: any, currentValue: any) => accumulator + (currentValue.price * currentValue.quantity), 0)
    cart['totalPrice'] = `$${totalPrice}`;
    return cart;
  },
};

export default cartQueries;

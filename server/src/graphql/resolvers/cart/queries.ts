import { Cart } from "../../../model/Cart";

const cartQueries = {
  cart: async (parent: any, { cartId }: any, context: any) => {
    let cart: any = await Cart.findOne({ cartId });
    const prices = cart.lineItems.map((item: any) => item.price);
    const totalPrice = prices.reduce((accumulator: any, currentValue: any) => accumulator + currentValue)
    cart['totalPrice'] = `$${totalPrice}`;
    return cart;
  },
};

export default cartQueries;

import { Cart } from "../../../model/Cart";
import { uuid } from "uuidv4";

const carttMutations = {
  addProductToCart: async (
    parent: any,
    { cartId, lineItem }: any,
    context: any
  ) => {
    let cart: any;
    const { productId, name, description, price, thumbnail, images, quantity } = lineItem;
    if (cartId) {
      cart = await Cart.findOne({ cartId });
      if (cart) {
        let itemIndex = cart.lineItems.findIndex(
          (item: any) => item.productId == productId
        );
        if (itemIndex > -1) {
          let productItem = cart.lineItems[itemIndex];
          productItem.quantity += quantity;
          cart.lineItems[itemIndex] = productItem;
        } else {
          cart.lineItems.push({
            productId,
            name,
            description,
            price,
            thumbnail,
            images,
            quantity,
          });
        }
      }
    } else {
      cart = new Cart({
        cartId: uuid(),
        lineItems: lineItem ? [lineItem] : [],
      });
    }
    const cartData: any = await cart.save();
    return {
      ...cartData._doc,
    };
  },
  updateCartProduct: async (
    parent: any,
    { cartId, lineItem }: any,
    context: any
  ) => {
    let cart: any;
    const { productId, quantity } = lineItem;
    cart = await Cart.findOne({ cartId });
    if (cart) {
      let itemIndex = cart.lineItems.findIndex(
        (item: any) => item.productId == productId
      );
      if (itemIndex > -1) {
        let productItem = cart.lineItems[itemIndex];
        productItem.quantity = quantity;
        cart.lineItems[itemIndex] = productItem;
      }
    }
    const cartData: any = await cart.save();
    return {
      ...cartData._doc,
    };
  },
  deleteCartProduct: async (
    parent: any,
    { cartId, lineItem }: any,
    context: any
  ) => {
    let cart: any;
    const { productId } = lineItem;
    cart = await Cart.findOne({ cartId });
    if (cart) {
      let itemIndex = cart.lineItems.findIndex(
        (item: any) => item.productId == productId
      );
      if (itemIndex > -1) {
        cart.lineItems.splice(itemIndex, 1);
      }
    }
    const cartData: any = await cart.save();
    return {
      ...cartData._doc,
    };
  },
};

export default carttMutations;

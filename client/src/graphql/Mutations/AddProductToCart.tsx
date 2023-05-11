import { gql } from "@apollo/client";

const ADD_PRODUCT_TO_CART = gql`
  mutation addProductToCart($cartId: String!, $lineItem: LineItem!) {
    addProductToCart(cartId: $cartId, lineItem: $lineItem) {
      cartId
      lineItems {
        productId
        name
        images
        price
        quantity
        description
      }
    }
  }
`;

export default ADD_PRODUCT_TO_CART;
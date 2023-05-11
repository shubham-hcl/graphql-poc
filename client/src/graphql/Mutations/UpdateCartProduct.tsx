import { gql } from "@apollo/client";

const UPDATE_CART_PRODUCT = gql`
  mutation updateCartProduct($cartId: String!, $lineItem: LineItem!) {
    updateCartProduct(cartId: $cartId, lineItem: $lineItem) {
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

export default UPDATE_CART_PRODUCT;
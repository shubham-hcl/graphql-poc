import { gql } from "@apollo/client";

const GET_CART = gql`
  query getCart($cartId: ID!) {
    cart(cartId: $cartId) {
      cartId
      totalPrice
      lineItems {
        productId
        name
        images
        thumbnail
        price
        quantity
        description
      }
    }
  }
`;

export default GET_CART
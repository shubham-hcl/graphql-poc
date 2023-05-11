import { gql } from "@apollo/client";

const DELETE_CART_PRODUCT = gql`
  mutation deleteCartProduct($cartId: String!, $lineItem: LineItem!) {
    deleteCartProduct(cartId: $cartId, lineItem: $lineItem) {
      cartId
    }
  }
`;

export default DELETE_CART_PRODUCT;
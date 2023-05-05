import { gql } from "@apollo/client";

const CART_DATA = gql`
  query getCart($id: String!) {
    cart(id: $id) {
      ...CartWithItems
    }
  }

  fragment CartWithItems on Cart {
    ...CartInfo
    lineItems {
      ...ItemInfo
    }
  }

  fragment CartInfo on Cart {
    id
    totalAmount
    currencyCode
  }

  fragment ItemInfo on LineItem {
    lineItemId
    productId
    name
    sku
    image
    price
    quantity
    maxPurchasableQty
    isAvailable
    size
    description
  }
`;

export default CART_DATA;
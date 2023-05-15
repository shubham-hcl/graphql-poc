import { gql } from '@apollo/client'

const GET_CART = gql`
  query getCart($cartId: ID!) {
    cart(cartId: $cartId) {
      cartId
      lineItems {
        ...ItemFragment
      }
    }
  }

  fragment ItemFragment on CartItem {
    productId
    name
    images
    thumbnail
    price
    quantity
    description
  }
`

export default GET_CART

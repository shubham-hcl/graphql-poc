import { gql } from '@apollo/client'

const GET_PRODUCT_DETAIL = gql`
  query getProduct($productId: ID!) {
    product(productId: $productId) {
      productId
      name
      description
      price
      thumbnail
      images
    }
  }
`

export default GET_PRODUCT_DETAIL

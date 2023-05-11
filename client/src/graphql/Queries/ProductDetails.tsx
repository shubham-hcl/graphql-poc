import { gql } from '@apollo/client'

const GET_PRODUCT_DETAIL = gql`
  query getAllProducts($productId: ID!) {
    product(id: $productId) {
      productId
      name
      description
      price
      thumbnail
    }
  }
`

export default GET_PRODUCT_DETAIL

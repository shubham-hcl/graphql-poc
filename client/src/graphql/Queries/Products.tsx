import { gql } from '@apollo/client'

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    products {
      productId
      name
      description
      price
      thumbnail
      images
    }
  }
`

export default GET_ALL_PRODUCTS

import { gql } from '@apollo/client'

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    products {
      productId
      name
      description
      price
      thumbnail
      image
    }
  }
`

export default GET_ALL_PRODUCTS

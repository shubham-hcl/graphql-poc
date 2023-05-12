import { gql } from '@apollo/client'

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      username
      email
      accessToken
      cartId
    }
  }
`
export default LOGIN_MUTATION

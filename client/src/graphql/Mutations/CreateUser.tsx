import { gql } from '@apollo/client'

const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      name
      email
      password
    }
  }
`
export default CREATE_USER_MUTATION

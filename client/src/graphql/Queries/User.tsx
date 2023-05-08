import { gql } from '@apollo/client';

const GET_ALL_USERS = gql`
    query getAllUsers {
        users {
            _id
            email
            name
        }
    }
`

export default GET_ALL_USERS;
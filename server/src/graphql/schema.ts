//import { buildSchema } from "graphql";

// GraphQL schema
const schema = `#graphql
    type Query {
        users(id: ID): [User!]!
        products: [Product!]!
    },
    type Mutation {
        login(email: String!, password: String!): Login!
        createUser(name: String!, email: String!, password: String!): User!
        createProduct(productInput:ProductInputData): Product!
        updateProduct(id: ID!, productInput:ProductInputData): Product!
        deleteProduct(id: ID!): Product!
    },
    type Login {
        _id: ID!
        email: String!
        accessToken: String!
    }
    type Product {
        _id:ID!
        name: String!
        description: String!
        price: Float!
        image: String!
    }, 
    type User {
        _id: String!
        name: String!
        email: String!
        password: String
    },
    input ProductInputData {
        name: String!
        description: String!
        price: Float!
        image: String!
    }
`;

export default schema;

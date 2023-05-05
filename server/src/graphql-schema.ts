import { buildSchema } from "graphql";

// GraphQL schema
const schema = buildSchema(`
    type Query {
        cart(id: String!): Cart
        users: [User!]!
    },
    type Mutation {
        updateQuantity(id: String!, lineItemId: String!, quantity: Int!): Cart!
        login(email: String!, password: String!): Login!
        createUser(name: String!, email: String!, password: String!): User!
        createProduct(productInput:ProductInputData): Product!
    },
    type Product{
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
    type Login {
        token: String
    },
    type Cart {
        id: String
        totalAmount: String
        currencyCode: String
        lineItems: [LineItem]
    },
    type LineItem {
        lineItemId: String!
        productId: String
        name: String
        sku: String
        image: String
        price: String
        quantity: Int
        maxPurchasableQty: Int
        isAvailable: Boolean
        size: String
        description: String
    }
    input ProductInputData {
        name: String!
        description: String!
        price: Float!
        image: String!
    }
`);

export default schema;

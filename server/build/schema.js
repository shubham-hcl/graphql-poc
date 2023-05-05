"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// GraphQL schema
const schema = (0, graphql_1.buildSchema)(`
    type Query {
        cart(id: String!): Cart
        users: [User!]!
    },
    type Mutation {
        updateQuantity(id: String!, lineItemId: String!, quantity: Int!): Cart!
        login(email: String!, password: String!): Login!
        createUser(name: String!, email: String!, password: String!): User!
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
`);
exports.default = schema;

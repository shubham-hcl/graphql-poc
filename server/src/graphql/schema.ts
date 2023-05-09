// GraphQL schema
const schema = `#graphql
    type Query {
        users(id: ID): [User!]!
        products: [Product!]!
        product(id: ID!): Product!
        cart(cartId: ID!): Cart
    },
    type Mutation {
        login(email: String!, password: String!): Login!
        createUser(username: String!, email: String!, password: String!): User!
        createProduct(productInput:ProductInputData): Product!
        updateProduct(id: ID!, productInput:ProductInputData): Product!
        deleteProduct(id: ID!): Product! 
        addProductToCart(cartId: String!, lineItem: LineItem!): Cart!
    },
    type Login {
        _id: ID!
        email: String!
        accessToken: String!
    }
    type Product {
        _id: ID!
        name: String!
        description: String!
        price: Float!
        image: String!
    }, 
    type User {
        _id: String!
        username: String!
        email: String!
        password: String
    },
    input ProductInputData {
        name: String!
        description: String!
        price: Float!
        image: String!
    }
    type Cart {
        cartId: ID!,
        lineItems: [cartItem!]!
    }
    type cartItem {
        productId: ID!,
        name: String!,
        description: String!,
        price: Float!
        image: String
        quantity: Int!
    }
    input LineItem {
        productId: ID!,
        name: String!,
        description: String!,
        price: Float!
        image: String
        quantity: Int!
    }
`;

export default schema;

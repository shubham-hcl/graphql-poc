// GraphQL schema
const schema = `#graphql
    type Query {
        users(id: ID): [User!]!
        products: [Product!]!
        product(productId: ID!): Product!
        cart(cartId: ID!): Cart
    },
    type Mutation {
        login(email: String!, password: String!): Login!
        createUser(username: String!, email: String!, password: String!): User!
        createProduct(productInput:ProductInputData): Product!
        updateProduct(productId: ID!, productInput:ProductInputData): Product!
        deleteProduct(productId: ID!): Product! 
        addProductToCart(cartId: String!, lineItem: LineItem!): Cart!
        updateCartProduct(cartId: String!, lineItem: LineItem!): Cart!
        deleteCartProduct(cartId: String!, lineItem: LineItem!): Cart!
    },
    type Login {
        _id: ID!
        email: String!
        accessToken: String!
        cartId: String
    }
    type Product {
        productId: ID!
        name: String!
        description: String!
        thumbnail: String!
        price: String!
        images: [String!]
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
        price: String!
        thumbnail: String!
        images: [String!]!
    }
    type Cart {
        cartId: ID!,
        lineItems: [cartItem!]!
        totalPrice: String!
    }
    type cartItem {
        productId: ID!,
        name: String!,
        description: String!,
        price: String!
        thumbnail: String!
        images: [String!]!
        quantity: Int!
    }
    input LineItem {
        productId: ID!,
        name: String!,
        description: String!,
        price: String!
        thumbnail: String!
        images: [String!]!
        quantity: Int!
    }
`;

export default schema;

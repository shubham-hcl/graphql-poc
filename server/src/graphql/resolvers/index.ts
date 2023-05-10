import { userMutations, userQueries } from "./user";
import { productMutations, productQueries } from "./product";
import { cartMutations, cartQueries } from "./cart";

const resolvers = {
  Query: {
    ...userQueries,
    ...productQueries,
    ...cartQueries,
  },
  Mutation: {
    ...userMutations,
    ...productMutations,
    ...cartMutations,
  }
};

export default resolvers;

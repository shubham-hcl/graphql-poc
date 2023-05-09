import { userMutations, userQueries } from "./user";
import { productMutations, productQueries } from "./product";

// const resolvers = {
//   ...userQueries,
//   ...productQueries,
//   ...userMutations,
//   ...productMutations,
// };

const resolvers = {
  Query: {
    ...userQueries,
    ...productQueries,
  },
  Mutation: {
    ...userMutations,
    ...productMutations,
  }
};

export default resolvers;

import User from "../../../model/User";
import { GraphQLError } from "graphql";

const userQueries = {
  users: async (parent: any, args: any, context: any) => {
    if (context?.id) {
      let users: any = await User.find();
      users = users.map((q: any) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      });
      users = args.id
        ? users.filter((user: any) => user._id === args.id)
        : users;
      return users;
    } else {
      throw new GraphQLError("You are not Authenticated");
    }
  },
};

export default userQueries;

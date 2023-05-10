import User from "../../../model/User";

const userQueries = {
  users: async (parent: any, args: any, context: any) => {
    let users: any = await User.find();
    users = users.map((q: any) => {
      return {
        ...q._doc,
        _id: q._id.toString(),
      };
    });
    users = args.id ? users.filter((user: any) => user._id === args.id) : users;
    return users;
  },
};

export default userQueries;

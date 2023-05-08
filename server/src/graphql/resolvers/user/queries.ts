import User from "../../../model/User";

const userQueries = {
  users: async ({ id }: any) => {
    let users: any = await User.find();
    users = users.map((q: any) => {
      return {
        ...q._doc,
        _id: q._id.toString(),
      };
    });
    users = id ? users.filter((user: any) => user._id === id) : users;
    return users;
  },
};

export default userQueries;

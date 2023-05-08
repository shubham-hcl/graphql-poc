import User from "../../../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userMutations = {
  createUser: async ({ name, email, password }: any) => {
    let securePassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: securePassword,
    });
    const createUser: any = await user.save();
    const newUser = {
      ...createUser._doc,
      _id: createUser._id.toString(),
    };
    return newUser;
  },
  login: async (args: any) => {
    console.log(args);
    const user = await User.findOne({ email: args.email });
    if (!user) {
      throw new Error("No user found ");
    }
    const isValid = await bcrypt.compare(args.password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password ");
    }
    const { _id, email } = user;
    const token = jwt.sign(
      {
        user: {
          _id,
          email,
        },
      },
      "secret",
      { expiresIn: "1d" }
    );
    const response = {
      _id,
      email,
      accessToken: token,
    };
    console.log(response);
    return response;
  }
};

export default userMutations;

import User from "../../../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Cart } from "../../../model/Cart";

const userMutations = {
  createUser: async (parent: any, args: any, context: any) => {
    let securePassword = await bcrypt.hash(args.password, 12);
    const user = new User({
      username: args.username,
      email: args.email,
      password: securePassword,
    });
    const createUser: any = await user.save();
    return {
      ...createUser._doc,
      _id: createUser._id.toString(),
    };
  },

  login: async (parent: any, args: any, context: any) => {
    let cartId: string = "";
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
    const cart: any = await Cart.find();
    if (cart?.length) {
      cartId = cart[0].cartId;
    }
    const response = {
      _id,
      username: user.username,
      email,
      accessToken: token,
      cartId,
    };
    return response;
  },
};

export default userMutations;

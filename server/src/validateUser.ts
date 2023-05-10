import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const validateUser = ({ req }: any) => {
  let userData: any;
  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (token) {
    try {
      const { user }: any = jwt.verify(token, "secret");
      userData = user;
    } catch (error) {
      throw new GraphQLError("Authentication token is invalid, please log in.");
    }
  }

  const contextValue: any = {
    id: token ? userData._id : null,
  };
  return contextValue;
};

export default validateUser;

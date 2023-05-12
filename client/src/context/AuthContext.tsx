import { createContext } from "react";

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: (auth: any) => {}
});

export default AuthContext;
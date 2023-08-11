import { createContext } from "react";

export const UserContext = createContext({
  userData: {},
  setUserData: () => {}
});

//things inside createContext dont really change, they exist for clearer reading
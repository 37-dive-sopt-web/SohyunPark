import { createContext } from "react";
import type { UserResponse } from "../apis/users/users";

export interface UserContextValue {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextValue | null>(null);

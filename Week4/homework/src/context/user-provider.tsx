import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./user-context";
import { getUsers } from "../apis/users/users";
import type { UserResponse } from "../apis/users/users";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  const clearUser = () => setUser(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await getUsers(Number(id));
        setUser(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

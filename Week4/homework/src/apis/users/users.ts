import { apiPost } from "../common/method";

interface UserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export const postUsers = async (body: UserRequest) => {
  return apiPost("/users", body);
};

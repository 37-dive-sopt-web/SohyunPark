import { apiPost } from "../common/method";

interface UserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  userId: number;
  message: string;
}

export const postUsers = async (body: UserRequest) => {
  return apiPost("/users", body);
};

export const postLogin = async (body: LoginRequest) => {
  return apiPost<LoginResponse>("/auth/login", body);
};

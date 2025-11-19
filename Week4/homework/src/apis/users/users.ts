import { apiGet, apiPatch, apiPost } from "../common/method";

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

export interface UserResponse {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export interface UserUpdateRequest {
  name: string;
  email: string;
  age: number;
}

export const postUsers = async (body: UserRequest) => {
  return apiPost("/users", body);
};

export const postLogin = async (body: LoginRequest) => {
  return apiPost<LoginResponse>("/auth/login", body);
};

export const getUsers = async (id: number) => {
  return apiGet<UserResponse>(`/users/${id}`);
};

export const patchUsers = async (id: number, body: UserUpdateRequest) => {
  return apiPatch(`/users/${id}`, body);
};

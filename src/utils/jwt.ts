import { UserInfo } from "@/types/global";
import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string): UserInfo => {
  return jwtDecode(token);
};

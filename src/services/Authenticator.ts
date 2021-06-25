import { sign, verify } from "jsonwebtoken";
import { AuthenticationData } from "../model/User";

export const tokenGenerator = (payload: AuthenticationData) => {
  return sign(payload, process.env.JWT_KEY!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const tokenValidate = (token:string):AuthenticationData => {
    return verify(
        token,
        String(process.env.JWT_KEY)
    ) as AuthenticationData
}
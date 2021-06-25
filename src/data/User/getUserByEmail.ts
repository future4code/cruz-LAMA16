import { connection } from "../connection";

export const getUserByEmail = async (email: string) => {
  const [result] = await connection("lama_users").where({ email });
  return result;
};
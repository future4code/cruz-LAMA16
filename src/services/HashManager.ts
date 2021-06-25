import { compareSync, genSaltSync, hashSync } from "bcryptjs";


export const createHash = (plainText: string) => {
    const salt = genSaltSync(Number(process.env.BCRYPT_COST));
  
    return hashSync(plainText, salt);
  };
  
  export const compareHash = (plainText: string, cypherText: string) => {
    return compareSync(plainText, cypherText);
  };
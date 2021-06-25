import { getUserByEmail } from "../data/User/getUserByEmail";
import { SignupUser } from "../model/User";
import { tokenGenerator } from "../services/Authenticator";
import { createHash } from "../services/HashManager";
import { idGenerator } from "../services/IdGenerator";


export const signupBusiness = async (signupInput:SignupUser) => {
    if (!signupInput.name || !signupInput.email || !signupInput.password || !signupInput.role) {
        throw new Error("All fields are required!");
      }
    
      if (
        typeof signupInput.name !== "string" ||
        typeof signupInput.email !== "string" ||
        typeof signupInput.password !== "string" ||
        typeof signupInput.role !== "string"
      ) {
        throw new Error("All fields must be 'string'.");
      }
    
      const userRequest = await getUserByEmail(signupInput.email)
    
      if(userRequest) {
        throw new Error("Email already exists!")
      }
    
      const cypherPassword = createHash(signupInput.password as string);
    
      const newUser = {
        id: idGenerator(),
        ...signupInput,
        password: cypherPassword,
      };
    
      await insertUser(newUser);
    
      const token: string = tokenGenerator({
        id: newUser.id,
        role: newUser.role
      });
    
      return token;
}
import userDatabase from './../data/User/UserDatabase'
import {SignupUser, SignupUserDTO, toUserRoles} from "../model/User";
import {createHash} from "../services/HashManager";
import {idGenerator} from "../services/IdGenerator";
import {tokenGenerator} from "../services/Authenticator";
import validateEmail from "../services/validateEmail";
import CustomError from "./erros/CustomError";

class UserBusiness {

  public signup = async(signupInput: SignupUserDTO) : Promise<string>=>{
      try{
        if (!signupInput.name || !signupInput.email || !signupInput.password || !signupInput.role) {
          throw new CustomError(400,"All fields are required!");
        }
        if (
          typeof signupInput.name !== "string" ||
          !validateEmail(signupInput.email) ||
          typeof signupInput.password !== "string" ||
          typeof signupInput.role !== "string"
        ) {
          throw new CustomError(400,"All fields must be 'string'.");
        }

        const user : SignupUser = {
          ...signupInput,
          role: toUserRoles(signupInput.role),
          password: createHash(signupInput.password),
          id: idGenerator()
        }

        await userDatabase.insertGeneric(user)
        return tokenGenerator({id: user.id, role: user.role})
      }catch (err){
        if(err?.sqlMessage.includes('Duplicate entry')){
          throw new CustomError(409,'E-mail already exists.')
        }
        throw new CustomError(err.statusCode,err.message)
      }

  }
}

export default new UserBusiness()
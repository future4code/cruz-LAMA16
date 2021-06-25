import BandDatabase from "../../data/Band/BandDatabase";
import { BandDTO, Bands } from "../../model/Bands";
import { AuthenticationData, USER_ROLES } from "../../model/User";
import { tokenValidate } from "../../services/Authenticator";
import { idGenerator } from "../../services/IdGenerator";
import CustomError from "../erros/CustomError";

class BandBusiness {
  public createBand = async (token: any, bandInput: BandDTO) => {
    try {
      if (!bandInput.name || !bandInput.music_genre || !bandInput.responsible) {
        throw new CustomError(400, "All fields are required!");
      }

      if (
        typeof bandInput.name !== "string" ||
        typeof bandInput.music_genre !== "string" ||
        typeof bandInput.responsible !== "string"
      ) {
        throw new CustomError(400, "All fields must be 'string'.");
      }

      const validatedToken: AuthenticationData = tokenValidate(token);

      if (validatedToken.role !== USER_ROLES.ADMIN) {
        throw new CustomError(401, "Only 'ADMIN' can register bands");
      }

      const [bandAlreadyExists] = await BandDatabase.selectGeneric("name", {name: bandInput.name});
      console.log("verific se retorna banda", bandAlreadyExists)

      if (bandAlreadyExists) {
        throw new CustomError(422, "This band already registred!");
      }

      const band:Bands = {
          ...bandInput,
          id: idGenerator()
      }

      await BandDatabase.insertGeneric(band)
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}

export default new BandBusiness();

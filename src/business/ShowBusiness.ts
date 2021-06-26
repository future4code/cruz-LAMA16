import showDatabase from "../data/ShowDatabase";
import {ShowData, ShowDTO, valideDate} from "../model/Show";
import CustomError from "./erros/CustomError";
import {ValidateInputDate} from "../services/ValidateInputDate";
import {idGenerator} from "../services/IdGenerator";

class ShowBusiness {
  public addShow = async(input : ShowDTO):Promise<void>=>{
    try{
      if(!input.weekDay || !input.startTime || !input.endTime || !input.bandId){
        throw new CustomError(400, 'All fields are required!')
      }
      const date = new ValidateInputDate(input.weekDay, input.startTime, input.endTime)
      const valideDate : valideDate = date.validateDate()

      //aqui verifico se a banda existe

    //  existindo prossigo:
      const showData : ShowData = {
        ...valideDate,
        band_id: input.bandId,
        id: idGenerator()
      }
      await showDatabase.insertGeneric(showData)

    }catch (err){

    }

  }
}
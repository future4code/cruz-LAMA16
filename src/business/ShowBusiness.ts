import showDatabase from "../data/ShowDatabase";
import {ShowData, ShowDTO, valideDate} from "../model/Show";
import CustomError from "./erros/CustomError";
import validateInputDate, {ValidateInputDate} from "../services/ValidateInputDate";
import {idGenerator} from "../services/IdGenerator";
import bandBusiness from "./Bands/BandBusiness";
import {tokenValidate} from "../services/Authenticator";
import {USER_ROLES} from "../model/User";

class ShowBusiness {
  public addShow = async(input : ShowDTO, token : any):Promise<void>=>{
    try{
      if(!token || typeof token !=='string'){
        throw new CustomError(400, 'Token invalid')
      }
      tokenValidate(token)
      if(!input.weekDay || !input.startTime || !input.endTime || !input.bandId){
        throw new CustomError(400, 'All fields are required!')
      }
      const date = new ValidateInputDate(input.weekDay, input.startTime, input.endTime)
      const valideDate : valideDate = date.validateDate()

      await bandBusiness.getBandByIdOrName(input.bandId)

      await this.getShows(input.weekDay, ['start_time','end_time'])
        .then(shows=>{
          for(const show of shows){
            date.validateShowDate(show.start_time, show.end_time)
          }
        }).catch(err=>{
          if(err.message!=='There are no shows on this day.'){
            throw new CustomError(500, err.message)
          }
          console.log(err.message)
        })

      const showData : ShowData = {
        ...valideDate,
        band_id: input.bandId,
        id: idGenerator()
      }
      await showDatabase.insertGeneric(showData)

    }catch (err){
      if(err.message?.includes('jwt expired')){
        throw new CustomError(403, 'Token expired.')
      }
      else if(err.message?.includes('jwt invalid')){
        throw new CustomError(400, 'Token invalid.')
      }
      throw new CustomError(err.statusCode, err.sqlMessage || err.message)
    }

  }

  public getShows = async (weekDay: string, aliases?:string | string[]):Promise<any>=>{
    validateInputDate.validateDay(weekDay)
    const result = await showDatabase.selectGeneric(
      aliases || ['name','music_genre'], {week_day:weekDay}
    ).join('lama_bands','lama_bands.id','lama_shows.band_id')
      .orderBy('start_time', 'asc')

    if(result.length===0){
      throw new CustomError(404, 'There are no shows on this day.')
    }
    return result
  }

  public addPhoto = async(url : any, idShow : any, token : any):Promise<void>=>{
    try{
      if(!token || typeof token!=="string"){
        throw new CustomError(400, 'Token invalid.')
      }
      tokenValidate(token)
      if(!url || typeof url!=='string'){
        throw new CustomError(400, 'Property url is required.')
      }
      if(!idShow || typeof idShow!=="string"){
        throw new CustomError(400, 'Property idShow is required.')
      }

      const [result] = await showDatabase.selectGeneric('id',  {id:idShow})
      if(!result){
        throw new CustomError(404, 'Show not found.')
      }

      await showDatabase.updateGeneric({photo:url}, {id: idShow})
    }catch (err){
      if(err.message?.includes('jwt expired')){
        throw new CustomError(403, 'Token expired.')
      }
      else if(err.message?.includes('jwt invalid')){
        throw new CustomError(400, 'Token invalid.')
      }
      throw new CustomError(err.statusCode || 500, err.message || err.sqlMessage)
    }

  }

  public getAllPhotos = async(token : any):Promise<string[]>=>{
    try{
      if(!token || typeof token!=='string'){
        throw new CustomError(400, 'Token invalid.')
      }
      const payload = tokenValidate(token)
      if(payload.role!==USER_ROLES.ADMIN){
        throw new CustomError(403, 'Only admin.')
      }

      const result = await showDatabase.selectGeneric('photo')
      if(result.length===0){
        throw new CustomError(404, 'Photos not found.')
      }

      const photos = []
      for(const res of result){
        if(res.photo!==null){
          photos.push(res.photo)
        }
      }
      return photos

    }catch (err){
      if(err.message?.includes('jwt expired')){
        throw new CustomError(403, 'Token expired.')
      }
      else if(err.message?.includes('jwt invalid')){
        throw new CustomError(400, 'Token invalid.')
      }
      throw new CustomError(err.statusCode || 500, err.message || 'Internal server error.')
    }
  }

}

export default new ShowBusiness()
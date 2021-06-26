import CustomError from "../business/erros/CustomError";
import {valideDate} from "../model/Show";

export class ValidateInputDate {
  constructor(private day : string,
              private hourStart : string,
              private hourEnd : string
  ) {}

  private validateHour= ():[number,number]=>{
    const regex = new RegExp('[0-2][0-9]h')

    const start = Number(this.hourStart.slice(0,2))
    if(!regex.test(this.hourStart) ||
      this.hourStart.length!==3 ||
      start<8 || start>23
    ) {
      throw new CustomError(400, 'Start hour incorrect')
    }

    const end = Number(this.hourEnd.slice(0,2))
    if(!regex.test(this.hourEnd)||
      this.hourStart.length!==3 ||
      end<8  || end>23
    ){
      throw new CustomError(400, 'End hour incorrect')
    }

    if(start>=end){
      throw new CustomError(400, "Start hour cannot be greater than end hour")
    }
    return [start, end]

  }

  private validateDay = ():string=>{
    if(this.day.toLowerCase().includes('sexta') ||
      this.day.toLowerCase().includes('sábado') ||
      this.day.toLowerCase().includes('domingo')){
      return this.day
    }
    else{
      throw new CustomError(400,'Day invalid')
    }
  }

  public validateDate = ():valideDate=>{
    const [start_time, end_time] = this.validateHour()
    const week_day = this.validateDay()
    return {
      week_day,end_time,start_time
    }
  }

}
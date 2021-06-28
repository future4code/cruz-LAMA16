import CustomError from "../business/erros/CustomError";
import {valideDate} from "../model/Show";

export class ValidateInputDate {
  constructor(private day : string,
              private hourStart : string,
              private hourEnd : string
  ) {}

  public validateHour= ():[number,number]=>{
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

  public validateDay = (weekDay = this.day):string=>{
    if(weekDay.toLowerCase().includes('sexta') ||
      weekDay.toLowerCase().includes('sábado') ||
      weekDay.toLowerCase().includes('domingo')){
      return weekDay
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

  public validateShowDate = (startTime : number, endTime : number) : void =>{
    const {start_time, end_time} = this.validateDate()
    console.log(start_time, end_time, startTime, endTime)
    if(start_time===startTime || end_time===endTime ||
      (start_time>startTime && start_time<endTime) ||
      (start_time<startTime && end_time>startTime)
    ){
      throw new CustomError(400, 'There is already a show on this date and hour.')
    }
  }

}

export default new ValidateInputDate('','','')
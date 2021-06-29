import {TicketBuyDTO, TicketDTO, toTicketsData} from "../model/Tickets";
import CustomError from "./erros/CustomError";
import ticketsDatabase from "../data/TicketsDatabase";
import {idGenerator} from "../services/IdGenerator";
import {tokenValidate} from "../services/Authenticator";
import {USER_ROLES} from "../model/User";

export class TicketsBusiness{
  public createTicket = async (input : TicketDTO, token : any)=>{
    try{
      if(typeof token!=='string'){
        throw new CustomError(400, 'Token invalid')
      }
      const payload = tokenValidate(token)
      if(payload.role!==USER_ROLES.ADMIN){
        throw new CustomError(403, "Only admin can create ticket.")
      }
      if(!input.name || !input.showId ||
        isNaN(input.value) || isNaN(input.ticketsQuantity)){
        throw new CustomError(400, "All fields are required!")
      }

      if(input.value<=0 || input.ticketsQuantity<=0){
        throw new CustomError(400, 'Value ou ticketsQuantity needs to be greater than zero.')
      }

      const ticketData = toTicketsData(input, idGenerator())

      await ticketsDatabase.insertGeneric(ticketData)
    }catch (err){
      if(err.sqlMessage?.includes('Duplicate entry')){
        throw new CustomError(409, 'Ticket already registered.')
      }
      else if(err.message?.includes('jwt expired')){
        throw new CustomError(403, 'Token expired.')
      }
      else if(err.message?.includes('jwt invalid')){
        throw new CustomError(400, 'Token invalid.')
      }
      throw new CustomError(err.statusCode || 500, err.message || 'Internal server error.')
    }
  }

  public buyTicket = async(input : TicketBuyDTO, token : any)=>{
    try{
      if(typeof token!=="string"){
        throw new CustomError(400, 'Token invalid')
      }
      tokenValidate(token)
      if(!input.name || typeof input.name!=="string"){
        throw new CustomError(400, 'Property name is required.')
      }
      if(isNaN(input.ticketsQuantity) || input.ticketsQuantity<=0){
        throw new CustomError(400, 'Property quantityTickets is required and needs to be greater than zero.')
      }

      const [result] = await ticketsDatabase.selectGeneric(
        ['id','tickets_quantity', 'tickets_purchased'], {name:input.name}
      )

      if(!result){
        throw new CustomError(404, 'Show not found.')
      }
      if((result.tickets_quantity-result.tickets_purchased)<input.ticketsQuantity){
        throw new CustomError(403, 'Insufficient tickets')
      }

      await ticketsDatabase.updateGeneric(
        {tickets_purchased: result.tickets_purchased+input.ticketsQuantity},
        {id: result.id}
      )

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

export default new TicketsBusiness()
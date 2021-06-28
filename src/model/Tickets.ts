export type TicketDTO = {
  name: any,
  value : any,
  showId : any,
  ticketsQuantity : any
}

export type TicketData = {
  name : string,
  value : number,
  show_id : string,
  tickets_quantity : number,
  id : string
}

export const toTicketsData = (input : TicketDTO, id : string):TicketData=>{
  return {
    name: input.name,
    value:  input.value,
    show_id: input.showId,
    tickets_quantity: input.ticketsQuantity,
    id
  }
}

export type TicketBuyDTO = {
  name: any,
  ticketsQuantity :  any
}
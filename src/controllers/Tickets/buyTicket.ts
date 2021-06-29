import {Request, Response} from "express";
import ticketsBusiness from "../../business/TicketsBusiness";

const buyTicket= async (req: Request, res: Response): Promise<any> => {
  try {
    await ticketsBusiness.buyTicket(req.body, req.headers.authorization)
    res.status(200).send({message: 'Ticket purchased!'})
  } catch (err) {
    res.status(err.statusCode || 400).send({message: err.message || err.sqlMessage})
  }
}

export default buyTicket
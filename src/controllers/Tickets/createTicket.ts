import {Request, Response} from "express";
import ticketsBusiness from "../../business/TicketsBusiness";

const createTicket=async (req: Request, res: Response): Promise<any> => {
  try {
    await ticketsBusiness.createTicket(req.body, req.headers.authorization)
    res.status(200).send({message:'Created!'})
  } catch (err) {
    res.status(err.statusCode || 500).send({message: err.message || err.sqlMessage})
  }
}

export default createTicket
import {Request, Response} from "express";
import showBusiness from "../../business/ShowBusiness";

const  createShow=async (req: Request, res: Response): Promise<any> => {
  try {
    await showBusiness.addShow(req.body, req.headers.authorization)
    res.status(200).send({message:'Created!'})
  } catch (err) {
    res.status(err.statusCode || 400).send({message: err.message || err.sqlMessage})
  }
}

export default createShow
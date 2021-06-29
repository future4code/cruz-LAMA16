import {Request, Response} from "express";
import showBusiness from "../../business/ShowBusiness";

const getShows= async (req: Request, res: Response): Promise<any> => {
  try {
    const shows = await showBusiness.getShows(req.params.weekDay)
    res.status(200).send({shows})
  } catch (err) {
    res.status(err.statusCode || 400).send({message: err.message || err.sqlMessage})
  }
}

export default getShows
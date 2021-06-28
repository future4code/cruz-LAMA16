import {Request, Response} from "express";
import showBusiness from "../../business/ShowBusiness";

const addPhoto= async (req: Request, res: Response): Promise<any> => {
  try {
    await showBusiness.addPhoto(req.body.url, req.params.idShow, req.headers.authorization)
    res.status(200).send({message: 'Photo added!'})
  } catch (err) {
    res.status(err.statusCode || 400).send({message: err.message || err.sqlMessage})
  }
}

export default addPhoto
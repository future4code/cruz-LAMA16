import {Request, Response} from "express";
import showBusiness from "../../business/ShowBusiness";

const getAllPhotos=async (req: Request, res: Response): Promise<any> => {
  try {
    const photos = await showBusiness.getAllPhotos(req.headers.authorization)
    res.status(200).send({photos})
  } catch (err) {
    res.status(err.statusCode || 400).send({message: err.message || err.sqlMessage})
  }
}

export default getAllPhotos
import {Request, Response} from "express";
import userBusiness from "../../business/UserBusiness";

const login= async (req: Request, res: Response): Promise<any> => {
  try {
    const token = await userBusiness.login(req.body)
    res.status(200).send({token})
  } catch (err) {
    res.status(err.statusCode || 500).send({message: err.message || 'Internal server error'})
  }
}

export default login
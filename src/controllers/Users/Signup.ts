import { Request, Response } from "express";
import {SignupUser, SignupUserDTO} from "../../model/User";
import userBusiness from './../../business/UserBusiness'

export const signupController = async (req:Request, res:Response) => {
    try {
      const token = await userBusiness.signup(req.body as SignupUserDTO)
      res.status(201).send({
          message: "Success",
          token
      })
        
    } catch (error) {
        res.status(error.statusCode || 500).send({error: error.message})
    }
}
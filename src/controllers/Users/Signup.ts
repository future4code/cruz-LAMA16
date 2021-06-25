import { Request, Response } from "express";
import { SignupUser } from "../../model/User";


export const signupController = async (req:Request, res:Response) => {
    try {
      const { name, email, password, role } = req.body

      const signupInput:SignupUser = {name, email,password,role}

      const token:string = await signupBusiness(signupInput)

      res.status(201).send({
          message: "Success",
          token
      })
        
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}
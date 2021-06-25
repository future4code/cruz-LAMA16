import { Request, Response } from "express";
import BandBusiness from "../../business/Bands/BandBusiness";
import { Bands } from "../../model/Bands";


export const getBandDetailController = async (req: Request, res: Response) => {
    try {
        const {idOrName} = req.params

        const band:Bands = await BandBusiness.getBandByIdOrName(idOrName)

        res.status(200).send({band})
    } catch (error) {
        res.status(error.statusCode || 500).send({ error: error.message})
    }
}
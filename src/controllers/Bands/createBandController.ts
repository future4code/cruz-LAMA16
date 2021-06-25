import { Request, Response } from "express";
import BandBusiness from "../../business/Bands/BandBusiness";
import { BandDTO } from "../../model/Bands";

export const createBandController = async (req: Request, res: Response) => {
  try {
      const token = req.headers.authorization
    await BandBusiness.createBand(token, req.body as BandDTO);
    res.status(201).send({
      message: "Created!"
    });
  } catch (error) {
    res.status(error.statusCode || 500).send({ error: error.message });
  }
};

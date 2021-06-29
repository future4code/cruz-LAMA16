import {Router} from "express";
import { createBandController } from "../controllers/Bands/createBandController";
import { getBandDetailController } from "../controllers/Bands/getBandDetailController";


const bandRouter = Router()
export default bandRouter

bandRouter.post('/create', createBandController)

bandRouter.get('/:idOrName', getBandDetailController)
import {Router} from "express";
import { createBandController } from "../controllers/Bands/createBandController";


const bandRouter = Router()
export default bandRouter

bandRouter.post('/create', createBandController)
bandRouter.get('/:idOrName', createBandController)
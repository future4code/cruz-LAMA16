import {Router} from "express";
import createShow from "../controllers/Shows/createShow";


const showRouter = Router()
export default showRouter

showRouter.post('/create', createShow)
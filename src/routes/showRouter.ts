import {Router} from "express";
import createShow from "../controllers/Shows/createShow";
import getShows from "../controllers/Shows/getShows";


const showRouter = Router()
export default showRouter

showRouter.post('/create', createShow)
showRouter.get('/:weekDay', getShows)
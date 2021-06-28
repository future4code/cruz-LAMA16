import {Router} from "express";
import createShow from "../controllers/Shows/createShow";
import getShows from "../controllers/Shows/getShows";
import createTicket from "../controllers/Tickets/createTicket";
import buyTicket from "../controllers/Tickets/buyTicket";
import addPhoto from "../controllers/Shows/addPhoto";
import getAllPhotos from "../controllers/Shows/getAllPhotos";


const showRouter = Router()
export default showRouter

showRouter.get('/photo', getAllPhotos)
showRouter.get('/:weekDay', getShows)
showRouter.post('/create', createShow)
showRouter.post('/ticket', createTicket)
showRouter.put('/ticket', buyTicket)
showRouter.put('/photo/:idShow', addPhoto)
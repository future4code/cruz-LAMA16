import {Router} from "express";
import createShow from "../controllers/Shows/createShow";
import getShows from "../controllers/Shows/getShows";
import createTicket from "../controllers/Tickets/createTicket";
import buyTicket from "../controllers/Tickets/buyTicket";


const showRouter = Router()
export default showRouter

showRouter.post('/create', createShow)
showRouter.get('/:weekDay', getShows)

showRouter.post('/ticket', createTicket)
showRouter.put('/ticket', buyTicket)
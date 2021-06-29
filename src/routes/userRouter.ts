import {Router} from "express";
import {signupController} from "../controllers/Users/Signup";
import login from "../controllers/Users/login";


const userRouter = Router()
export default userRouter

userRouter.post('/signup', signupController)
userRouter.post('/login', login)
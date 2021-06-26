import express from 'express'
import bandRouter from './routes/bandRoutes';
import userRouter from "./routes/userRouter";

const app = express()

app.use(express.json())

app.use('/user', userRouter)
app.use('/band', bandRouter)

app.listen(3003, () => {
    console.log("Server is running")
})
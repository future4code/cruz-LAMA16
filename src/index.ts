import express from 'express'
import bandRouter from './routes/bandRoutes';
import userRouter from "./routes/userRouter";
import showRouter from "./routes/showRouter";
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/band', bandRouter)
app.use('/show', showRouter)

app.listen(3003, () => {
    console.log("Server is running")
})
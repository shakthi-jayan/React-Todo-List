import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/taskRoutes.js'
import userRouter from './routes/userRoutes.js'
const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use('/api/backend',router)
app.use('/api/users',userRouter)
const port = process.env.PORT
const mongouri = process.env.MONGO_URI
mongoose.connect(mongouri)
.then(
    app.listen(port,()=>{
        console.log("Mongodb Successfully connected")
        console.log("Server is running")
    })
).catch(err => console.log(err))


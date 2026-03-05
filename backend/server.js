import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import router from './routes/taskRoutes.js'
const app = express()
app.use(express.json())
app.use('/api/backend',router)
const port = process.env.PORT
const mongouri = process.env.MONGO_URI
mongoose.connect(mongouri)
.then(
    app.listen(port,()=>{
        console.log("Mongodb Successfully connected")
        console.log("Server is running")
    })
).catch(err => console.log(err))


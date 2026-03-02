import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = process.env.PORT
const mongouri = process.env.MONGO_URI
mongoose.connect(mongouri)
.then(
    app.listen(port,()=>{
        console.log("Mongodb Successfully connected")
        console.log("Server is running")
    })
).catch(err => console.log(err))


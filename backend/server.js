
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { connectToMongoDb } from './db/db.js'
import userRoutes from './routes/user.routes.js'
import captainRoutes from './routes/captain.routes.js'


dotenv.config()

const port=process.env.PORT || 3000
const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
// routes

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)

app.listen(port,()=>{
  console.log(`Server running at PORT:${port}`)
  connectToMongoDb()
})
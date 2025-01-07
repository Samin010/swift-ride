
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToMongoDb } from './db/db.js'

import userRoutes from './routes/user.routes.js'

dotenv.config()

const port=process.env.PORT || 3000
const app=express()

app.use(express.json())

app.use(cors())

// routes

app.use('/api/users',userRoutes)

app.listen(port,()=>{
  console.log(`Server running at PORT:${port}`)
  connectToMongoDb()
})
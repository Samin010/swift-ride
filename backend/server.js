
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToMongoDb } from './db/db.js'

dotenv.config()

const port=process.env.PORT || 3000
const app=express()

app.use(cors())

app.listen(port,()=>{
  console.log(`Server running at PORT:${port}`)
  connectToMongoDb()
})
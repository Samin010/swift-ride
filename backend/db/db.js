
import mongoose from 'mongoose'

export const connectToMongoDb=async()=>{
  try {
    console.log('Attempting to connect to Mongo Db')
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log('Connected to Mongo Db')
  } catch (error) {
    console.log('Error while connecting to database',error.message)
  }
}
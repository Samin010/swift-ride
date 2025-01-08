import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { CaptainModel } from '../models/captain.model.js'
import { generateToken } from '../utils/token.js'


export const registerCaptain=async(req,res,next)=>{
  try {
    // console.log('Req obj is',req.body)
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }

    const {fullname,email,password,vehicle}=req.body
    const firstname=fullname?.firstname 
    const lastname=fullname?.lastname
    const color=vehicle?.color
    const capacity=vehicle?.capacity
    const vehicleType=vehicle?.vehicleType 
    const plate=vehicle?.plate
    if(!firstname || !email || !password || !vehicle || !color || !capacity || !vehicleType || !plate){
      throw new Error('All fields are required')
    }
     const isCaptain = await CaptainModel.findOne({ email });
     if (isCaptain) {
       res.status(400).json({ message: "Captain already exists" });
     }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const captain=new CaptainModel({
      fullname:{
        firstname,
        lastname
      },
      email,
      password:hashedPassword,
      vehicle:{
        color,
        plate,
        capacity,
        vehicleType
      }
    })

   const token = generateToken(captain._id);

   await captain.save()

   res.status(201).json({token,captain})

  } catch (error) {
    console.log('Error in Captain controller:',error.message)
  }
}

import mongoose from 'mongoose'

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be atleast 3 characters long"],
    },

    lastname: {
      type: String,
      minlength: [3, "Lasttname must be atleast 3 characters long"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be atleast 5 characters long"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be atleast 3 characters long"],
    },

    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be atleast 3 characters long"],
    },

    capacity: {
      type: Number,
      required: true,
      minlength: [3, "Capacity must be atleast 1"],
    },

    vehicleType:{
      type:String,
      required:true,
      enum:['car','motorcycle','auto']
    }
  },

  location:{
    latitude:{
      type:Number
    },

    longitude:{
      type:Number
    }
  }
});

export const CaptainModel=mongoose.model('captain',captainSchema)
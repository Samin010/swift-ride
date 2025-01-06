
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
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
  },
  socketId: {
    type: String,
    required: true,
  },
});
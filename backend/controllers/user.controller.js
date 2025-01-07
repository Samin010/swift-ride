import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { userModel } from "../models/user.model.js";
import { generateToken } from "../utils/token.js";

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const firstname = fullname.firstname;
    const lastname = fullname.lastname;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Testing:',firstname,lastname,email,hashedPassword)
    const user = new userModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);
    // console.log("Token inside user controller is:", token);
    await user.save();
    res.status(201).json({ token, user });
  } catch (error) {
    console.log("Error in user Controller:", error.message);
  }
};

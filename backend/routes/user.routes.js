import express from 'express'
const router=express.Router()
import {body} from 'express-validator'
import { registerUser } from '../controllers/user.controller.js'

router.post('/register',[
  body('email').isEmail().withMessage('Invalid email'),
  body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be atleast 3 characters long'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],registerUser)

export default router
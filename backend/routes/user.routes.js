import express from 'express'
const router=express.Router()
import {body} from 'express-validator'
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'

router.post('/register',[
  body('email').isEmail().withMessage('Invalid email'),
  body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be atleast 3 characters long'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],registerUser)

router.post('/login',[
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],loginUser)

router.get('/profile',protectRoute,getUserProfile)

router.get('/logout',protectRoute,logoutUser)

export default router
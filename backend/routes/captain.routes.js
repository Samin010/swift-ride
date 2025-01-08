import express from 'express'
import {body} from 'express-validator'
import { registerCaptain } from '../controllers/captain.controller.js'

const router=express.Router()

router.post('/register',[
  body('email').isEmail().withMessage('Invalid email'),
  body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be atleast 3 characters long'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
  body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
  body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
  body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be atleast 1'),
  body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle'),
],registerCaptain)

export default router
import express from 'express'
const router = express.Router();

import {body} from 'express-validator'

import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain.controller.js'
import { protectCaptainRoute } from '../middlewares/auth.middleware.js'


router.post('/register',[
  body('email').isEmail().withMessage('Invalid email'),
  body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be atleast 3 characters long'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
  body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
  body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
  body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be atleast 1'),
  body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle'),
],registerCaptain)


router.post("/login", [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
],loginCaptain);


router.get('/logout',protectCaptainRoute,logoutCaptain)

router.get('/profile',protectCaptainRoute,getCaptainProfile)

export default router
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"
import bcrypt, { hash } from 'bcrypt'
import generateToken from '../util/generateToken.js'

// @desc   Auth user & get token
// @route  POST  /api/users/login
// @access Public

const authUser = asyncHandler(async(req,res) => {
   const {email ,password} = req.body
   const user =await User.findOne({email})

    if(!user){
        return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
     }

    const isMatch = await bcrypt.compare(password ,user.password)

    if (isMatch) {
     res.json({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
         token:generateToken(user._id)
     })
   }
   else{
     return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
   }
})

// @desc   Register a new user
// @route  POST  /api/users
// @access Public

const registerUser = asyncHandler(async(req,res) => {
   let {name ,email ,password} = req.body
   const userExist =await User.findOne({email})
   if(userExist){
    return res.status(400).json({errors:[{msg: 'IUser exist already'}]})
   }
   const salt = await bcrypt.genSalt(10)
   password =await bcrypt.hash(password,salt)
   
   const user = await User.create({
       name,
       email,password
   })
   if(user){
       res.status(201).json({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
         token:generateToken(user._id)
     })
   }
   else{
       res.status(400).json({errors:[{ms:'Invalid user data'}]})
   }
})



// @desc   get user profile
// @route  GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async(req,res) => {
   const user =await User.findById (req.user._id)
   console.log(user);

    if (user) {
     res.json({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
     })
   }
   else{
     return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
   }
})



// @desc   update user profile
// @route  PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async(req,res) => {
   const user =await User.findById (req.user._id)
   console.log(user);

    if (user) {
      user.name =req.body.name || user.name
      user.email =req.body.email || user.email

      if(req.body.password) {
        user.password = req.body.password
      }

      const updatedUser =await user.save()

       res.json({
         _id:updatedUser._id,
         name:updatedUser.name,
         email:updatedUser.email,
         isAdmin:updatedUser.isAdmin,
         token:generateToken(updatedUser._id)
     })
   }
   else{
       res.status(400).json({errors:[{msg: 'User not found'}]})

   }
})





export {authUser ,getUserProfile ,registerUser ,updateUserProfile}
import  jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async(req,res,next) =>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token =req.headers.authorization.split(" ")[1]
            const decoded =jwt.verify(token , process.env.JWT_SECRET)
            req.user  =await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
        return res.status(400).json({errors:[{msg: 'token not found'}]})
        }
    }
    if(!token){
        return res.status(400).json({errors:[{msg: 'Un authorized'}]})
    }
})

export default protect
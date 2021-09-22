import express from'express'
import dotenv from'dotenv'
import connectDB from "./config/db.js"
import {notFound ,errorHandler} from './middleware/errorMiddleware.js'
import path from 'path'
import morgan from 'morgan'


//routes
import productRoute from "./routes/productRoute.js"
import userRoute from "./routes/userRoute.js"
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'

//configurations
dotenv.config()
connectDB()
const app =express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())





app.use("/api/products",productRoute)
app.use("/api/users",userRoute)
app.use("/api/orders",orderRoute)
app.use("/api/upload",uploadRoute)

app.get("/api/config/paypal" , (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname , '/frontend/build')))
    app.get('*' ,(req,res)=>res.sendFile(path.resolve(__dirname , 'frontend' , 'build' ,'index.html')))
}else{
    app.get('/' ,(req,res)=>{
    res.send("API IS RUNNING")
})
}

//make uploads folder static
app.use('/uploads' , express.static(path.join(__dirname , '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT =process.env.PORT || 5000
app.listen(PORT , console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))
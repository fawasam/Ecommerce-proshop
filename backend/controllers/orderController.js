import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @desc   Create new order
// @route  POST  /api/orders
// @access Private

const addOrderItems = asyncHandler(async(req,res) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } =req.body
    if(orderItems && orderItems.length == 0) {
       res.status(400).json({errors:[{msg: 'No ordered item'}]})
    }else{
        const order =new Order ({
        user:req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice 
        })
        const createdOrder = await order.save()
        console.log('creted')
        res.status(201).json(createdOrder)
    }
})


// @desc   get order BY ID
// @route  GET  /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async(req,res) => {
   const order = await Order.findById(req.params.id).populate('user','name email')
   console.log(order);

   if(order){
       res.json(order)
   }else{
     return res.status(404).json({errors:[{msg: 'Order not Found '}]})
   }
})

// @desc   update order to paid
// @route  PUT  /api/orders/:id/pay
// @access Private

const updateOrderTopaid = asyncHandler(async(req,res) => {
   const order = await Order.findById(req.params.id)

   if(order){
       order.isPaid =true
       order.paidAt =Date.now()
       order.paymentResult={
           id:req.body.id,
           status:req.body.status,
           update_time:req.body.update_time,
           email_address:req.body.payer.email_address
       }
       const updatedOrder = await order.save()
       res.json(updatedOrder)
   }else{
     return res.status(404).json({errors:[{msg: 'Order not Found '}]})
   }
})


// @desc   Get logged in user order
// @route  GET  /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async(req,res) => {
   const orders = await Order.find({user:req.user._id})
   res.json(orders)
})



// @desc   Get all order
// @route  GET  /api/orders/orders
// @access Private/admin

const getOrders = asyncHandler(async(req,res) => {
   const orders = await Order.find().populate('user' , 'id name')
   res.json(orders)
})


// @desc   update order to delivered
// @route  PUT  /api/orders/:id/deliver
// @access Private /admin

const updateOrderToDelivered= asyncHandler(async(req,res) => {
   const order = await Order.findById(req.params.id)

   if(order){
       order.isDelivered =true
       order.deliveredAt =Date.now()
       const updatedOrder = await order.save()
       res.json(updatedOrder)
   }else{
     return res.status(404).json({errors:[{msg: 'Order not Found '}]})
   }
})



export {addOrderItems , getOrderById ,updateOrderTopaid , getMyOrders , getOrders , updateOrderToDelivered}
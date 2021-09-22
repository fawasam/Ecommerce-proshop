import express from'express'
import { addOrderItems ,getOrderById , updateOrderTopaid ,getMyOrders , getOrders , updateOrderToDelivered } from '../controllers/orderController.js'
import {protect , admin} from '../middleware/authMiddleware.js'



const router = express.Router()

// @route  http://localhost:5000/api/orders

router.get('/' ,protect ,admin,getOrders)
router.post('/' ,protect ,addOrderItems)
router.get('/myorders',protect ,getMyOrders)
router.get('/:id',protect ,getOrderById)
router.put('/:id/pay',protect ,updateOrderTopaid)
router.put('/:id/deliver',protect, admin ,updateOrderToDelivered)

export default router 
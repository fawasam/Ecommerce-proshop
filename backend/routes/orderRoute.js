import express from'express'
import { addOrderItems ,getOrderById , updateOrderTopaid ,getMyOrders } from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'



const router = express.Router()

// @route  http://localhost:5000/api/orders

router.post('/' ,protect ,addOrderItems)
router.get('/myorders',protect ,getMyOrders)
router.get('/:id',protect ,getOrderById)
router.put('/:id/pay',protect ,updateOrderTopaid)

export default router 
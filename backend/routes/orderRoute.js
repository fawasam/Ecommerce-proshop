import express from'express'
import { addOrderItems ,getOrderById , updateOrderTopaid } from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'



const router = express.Router()


router.post('/' ,protect ,addOrderItems)
router.get('/:id',protect ,getOrderById)
router.put('/:id/pay',protect ,updateOrderTopaid)

export default router 
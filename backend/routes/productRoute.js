import express from'express'
import { 
    getProductsById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct
} from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


const router = express.Router()

// @route  http://localhost:5000/api/products

router.get('/' ,getProducts) 
router.get('/:id',getProductsById)

router.post('/' ,protect,admin, createProduct) 
router.delete('/:id',protect,admin ,deleteProduct)
router.put('/:id' ,protect,admin,updateProduct) 


export default router
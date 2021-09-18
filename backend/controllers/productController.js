import asyncHandler from 'express-async-handler'
import { protect } from '../middleware/authMiddleware.js'
import Product from '../models/productModel.js'



// @desc   Fetch all products
// @route  GET  /api/products
// @access Public

const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find()
    res.json(products)
})

// @desc   Fetch single products
// @route  GET  /api/products/:id
// @access Public

const getProductsById = asyncHandler(async(req,res) => {

 const product =await Product.findById(req.params.id)
    if(product){

        res.json(product)
    }else{
       res.status(404).json({errors:[{msg: 'Product not found'}]})

    }
})


// @desc   DELET a product
// @route  DELETE  /api/products/:id
// @access Private /Admin

const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({message:'Product removed'})
    }
       res.status(404).json({errors:[{msg: 'Product not found'}]})
})


// @desc   CREATE a product
// @route  POST  /api/products
// @access Private /Admin

const createProduct = asyncHandler(async(req,res) => {
    const product = new Product ({
        name:'sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


// @desc   UPDATE a product
// @route  PUT  /api/products/:id
// @access Private /Admin

const updateProduct = asyncHandler(async(req,res) => {

    const { 
        name, 
        price, 
        description,
        category,
        image,
        brand,
        countInStock
    }=req.body

    const product = await Product.findById(req.params.id)

    if(product){

        product.name =name
        product.price =price
        product.description =description
        product.image =image
        product.brand =brand
        product.category =category
        product.countInStock =countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)

    }else{
       res.status(404).json({errors:[{msg: 'Product not found'}]})
    }
})



export {
    getProducts,
    getProductsById,
    deleteProduct,
    createProduct,
    updateProduct
}
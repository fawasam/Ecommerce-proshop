import axios from 'axios'
import React, { useEffect, useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Link } from 'react-router-dom'
import { Button ,Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer.jsx'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader.jsx'
// import { USER_UPDATE_RESET } from '../redux/constants/constants.js'
import { listProductsDetails  ,updateProducts } from '../redux/actions/productActions.js'
import Swal from 'sweetalert2'
import { PRODUCT_UPDATE_RESET } from '../redux/constants/constants.js'


const ProductEdit = ({ match, history}) => {

    const dispatch =useDispatch()

    const productId =match.params.id
    const [name ,setName] =useState('')
    const [price ,setPrice] =useState(0)
    const [image ,setImage] =useState('')
    const [brand ,setBrand] =useState('')
    const [category,setCategory] =useState('')
    const [countInStock ,setCountInStock] =useState(0)
    const [description ,setDescription] =useState('')
    const [uploading ,setUploading] =useState(false)


    const productDetails = useSelector(state => state.productDetails)
    const { error , product ,loading } =productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { success:successUpdate } =productUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push("/admin/productList")
        }else{
            if(!product.name  || product._id !== productId){
                dispatch(listProductsDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
          
    },[product , dispatch , productId  , history ,successUpdate])
    
    const uploadFileHandler = async(e)=>{
        const file =e.target.files[0]
        const formData =new FormData()
        formData.append('image' , file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type' :'multipart/form-data'
                }
            }
        const  {data} = await axios.post('/api/upload' , formData , config)
        setImage(data)
        setUploading(false)
        } catch (error) {  
            console.log('upload error' , error)
            setUploading(false)
        }

    }
    const submitHandler =(e)=>{
        e.preventDefault()
                Swal.fire({
         title: 'Product Update',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          }) 
          dispatch(updateProducts({
              _id:productId,
              name,price,image,brand,category,description,countInStock
          }))
    
    }

    return (
        <>
        <Link to ='/admin/productList' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Create/Edit Product</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(

            <Form onSubmit={submitHandler}>
               <FormGroup controlId='name' className='mt-2'>
                   <FormLabel>Name</FormLabel>
                   <FormControl 
                   type='name' 
                   placeholder='Enter name'
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='price' className='mt-2'>
                   <FormLabel>Price</FormLabel>
                   <FormControl 
                   type='number' 
                   placeholder='Enter Price'
                   value={price}
                   onChange={(e)=>setPrice(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='Image' className='mt-4'>
                   <FormLabel>Image</FormLabel>
                   <FormControl
                   type='text'
                   placeholder='Enter image Url'
                   value={image}
                   onChange={(e)=>setImage(e.target.value)}
                   >
                   </FormControl>
                   <Form.File 
                   id='image-file' 
                   custom
                   onChange={uploadFileHandler}
                   ></Form.File>
                   {uploading && <Loader />}
               </FormGroup>

               <FormGroup controlId='brand' className='mt-4'>
                   <FormLabel>Brand</FormLabel>
                   <FormControl
                   type='text'
                   placeholder='Enter brand'
                   value={brand}
                   onChange={(e)=>setBrand(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='category' className='mt-4'>
                   <FormLabel>Category</FormLabel>
                   <FormControl
                   type='text'
                   placeholder='Enter category'
                   value={category}
                   onChange={(e)=>setCategory(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='description' className='mt-4'>
                   <FormLabel>Description</FormLabel>
                   <FormControl
                   type='text'
                   placeholder='Enter description'
                   value={description}
                   onChange={(e)=>setDescription(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='countInStock' className='mt-4'>
                   <FormLabel>CountInStock</FormLabel>
                   <FormControl
                   type='number'
                   placeholder='Enter countInStock'
                   value={countInStock}
                   onChange={(e)=>setCountInStock(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>
               
               <Button  className='mt-3' type='submit'variant='primary'>
                   Update
               </Button>
           </Form>

            )}
          
        </FormContainer>
        </>
    )
}

export default ProductEdit

import React, { useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem,Form ,FormControl, FormLabel, FormGroup} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch , useSelector} from "react-redux"
import Loader from '../components/Loader'
import Message from '../components/Message'
import Swal from 'sweetalert2'

import {listProductsDetails , createProductReview} from "../redux/actions/productActions"
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/constants'


const ProductPage = ({match , history}) => {
    
    const dispatch =useDispatch()

    const [qty ,setQty] =useState(1)
    const [rating,setRating] =useState(0)
    const [comment,setComment] =useState('')
    
    const productDetails =useSelector(state =>state.productDetails)
    const {loading ,error ,product} =productDetails

    const userLogin =useSelector(state =>state.userLogin)
    const {userInfo} =userLogin

    const productReview =useSelector(state =>state.productReview)
    const {error:errorReview ,success:successReview } =productReview


    useEffect(()=>{
        if(successReview){
        Swal.fire({
         title: 'Product Review creted',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          }) 
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductsDetails(match.params.id))
    },[match,dispatch , successReview])

    const addTocart =()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id , {
            rating,comment
        }))

    }

    return ( 
        <>
        <Link className='btn btn-dark my-3' to="/products">
            Go back
        </Link>
        {loading ?
        setTimeout(()=>{
            <Loader/> 
        },[500])
            : error ? <Message /> :
        (

        <>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant="flush" >
                    <ListGroupItem>
                        <h2>{product.name}</h2>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Rating  value={product.rating} text={`${product.numReviews} reviews`}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>
                        Price : ${product.price}
                        </h2>
                    </ListGroupItem>
                    <ListGroupItem>
                        Description : {product.description}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <Row>
                                <Col>Price :</Col>
                                <Col> <strong>${product.price}</strong> </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Status :</Col>
                                <Col> {product.countInStock >0 ?'In stock' : 'Out of Stock'} </Col>
                            </Row>
                        </ListGroupItem>
                        {product.countInStock > 0 &&  (
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                    <FormControl as='select' value={qty}
                                     onChange={(e)=>{setQty(e.target.value)}}>
                                         {[...Array(product.countInStock).keys()].map(x=>(
                                             <option value={x+1} key={x+1}>
                                                 {x+1} 
                                             </option>
                                         ))}

                                    </FormControl>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )}
                            <Button 
                            className="btn btn-block" 
                            ype="button"  
                            disabled ={product.countInStock===0}
                            onClick={addTocart}
                            >Add To Cart</Button>        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message variant="dark">No reviews</Message>}
                <ListGroup variant='flush'>
                    {product.reviews.map(review =>(
                        <ListGroupItem key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </ListGroupItem>
                    ))}
                    <ListGroupItem className="mt-5">
                        <h2>Write a review</h2>
                        {errorReview && <Message variant='danger'>Review already saved</Message>}
                        {userInfo ? (
                        <Form onSubmit={submitHandler}>
                            <FormGroup className="mt-2" controlId='rating'>
                                <FormLabel>Rating</FormLabel>
                                <FormControl 
                                as='select'
                                value={rating}
                                onChange={(e)=> setRating(e.target.value)}
                                >
                                <option value="">Select </option>
                                <option value="1"> 1 - poor </option>
                                <option value="2"> 2 - Fair </option>
                                <option value="3"> 3 - Good </option>
                                <option value="4"> 4 - Very Good </option>
                                <option value="5"> 5 - Excellent </option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="mt-2" controlId='comment'>
                                <FormLabel>Comment</FormLabel>
                                <FormControl
                                as='textarea'
                                row='3'
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                ></FormControl>
                            </FormGroup>
                            <Button className="mt-2" type='submit' variant="primary">Submit</Button>

                        </Form>) : ( <Message  variant="dark">Please <Link to='/login'>Sign in</Link>to write a review </Message> )}
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
        </>
        )}
        </>
    )
}

export default ProductPage

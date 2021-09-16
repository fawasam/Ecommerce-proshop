import React, { useEffect, useState  } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem ,FormControl} from 'react-bootstrap'
import Rating from '../components/Rating'

import {useDispatch , useSelector} from "react-redux"
import {listProductsDetails} from "../redux/actions/productActions"
import Loader from '../components/Loader'
import Message from '../components/Message'



const ProductPage = ({match}) => {

    const [qty ,setQty] =useState(1)
    const history =useHistory()

    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(listProductsDetails(match.params.id))
    },[match,dispatch])

    const productDetails =useSelector(state =>state.productDetails)
    const {loading ,error ,product} =productDetails
    const addTocart =()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
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
        )}
        </>
    )
}

export default ProductPage

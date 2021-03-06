import React, { useEffect } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Link } from 'react-router-dom'
import {Row ,Col , ListGroup , Image  , Button ,Card ,ListGroupItem ,FormControl } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart , removeFromCart } from '../redux/actions/cartActions'

const Cart = ({match,location, history}) => {
    
    const dispatch =useDispatch()

    //get productId from url
    const productId =match.params.id
    //get qty from url
    const qty =location.search ?Number(location.search.split('=')[1]) : 1;

    const cart =useSelector (state => state.cart )
    const  {cartItems} =cart
    // console.log(cartItems )

    useEffect(()=>{
           if(productId) {
               dispatch(addToCart(productId , qty))
           }
    },[dispatch , productId ,qty])


    const  removeFromCartHandler =(id) =>{
        dispatch(removeFromCart(id))
    }
    const checkOutHandler =() =>{
        console.log('checkout');
        history.push('/login?redirect=shipping')
    }


    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                { cartItems.length === 0 ? (<Message>Your cart is empty <Link to="/"> Go back</Link> </Message>):(
                    <ListGroup variant ='flush' >
                        {cartItems.map(item=>(
                            
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src ={item.image} alt ={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                    <FormControl as='select' value={item.qty}
                                     onChange={(e)=>dispatch(addToCart(item.product ,Number(e.target.value)))}>
                                         {[...Array(item.countInStock).keys()].map(x=>(
                                             <option value={x+1} key={x+1}>
                                                 {x+1}
                                             </option>
                                         ))}
                                    </FormControl>
                                    </Col>
                                    <Col md={2}> 
                                    <Button type="button" 
                                    variant ='light'
                                    onClick={()=>removeFromCartHandler(item.product)} 
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                ) }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Subtotal ({cartItems.reduce((accumlator ,item) => accumlator +item.qty , 0)}) items</h2>
                            <div style={{ display :'flex' ,alignItems:"center"}}>
                            ${cartItems.reduce ((acc ,item) => acc + item.qty * item.price , 0 ).toFixed(2)}
                            </div>
                        </ListGroupItem>
                        <>
                            <Button type="button" 
                            className='btn-block' 
                            disabled ={cartItems.length === 0} 
                            onClick ={checkOutHandler}>
                                Proceed To CheckOut
                            </Button>
                        </>
                    </ListGroup>
                </Card>
            </Col>
            <Col md={2}>
            </Col>
            
        </Row>
    )
}

export default Cart

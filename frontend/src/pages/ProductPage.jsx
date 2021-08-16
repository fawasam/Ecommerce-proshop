import React from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductPage = ({match}) => {
    //imp match get from app.js route
    const product =products.find((p)=>p._id === match.params.id)

    return (
        <>
        <Link className='btn btn-dark my-3' to="/">
            Go back
        </Link>
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
                            <Button className="btn btn-block" type="button"  disabled ={product.countInStock===0}>Add To Cart</Button>        
                    </ListGroup>
                </Card>
            </Col>
        </Row>

        </>
    )
}

export default ProductPage

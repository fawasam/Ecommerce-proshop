

import React, { useEffect  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import { LinkContainer} from 'react-router-bootstrap'
import { Button,Table  , Row ,Col } from 'react-bootstrap'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
import { PRODUCT_CREATE_RESET } from '../redux/constants/constants.js'
import { listProducts , deleteProducts ,createProducts } from '../redux/actions/productActions.js'



const ProductList = ({history , match}) => {

    const dispatch =useDispatch()

    const productList = useSelector (state =>state.productList)
    const {loading , error , products} =productList

    const productDelete = useSelector (state =>state.productDelete)
    const {success:successDelete } =productDelete

    const userLogin = useSelector (state =>state.userLogin)
    const {userInfo} = userLogin

    const productCreate = useSelector (state =>state.productCreate)
    const {success:successCreate , product:createdProduct} =productCreate


    useEffect(()=>{

        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin ){
           history.push('/login')
        }
        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }

    },[dispatch , history  ,userInfo  ,successDelete , successCreate , createdProduct])

    const deleteHandler =(id) =>{

    Swal.fire({
        title: 'Do you want to remove this Product ?',
        showDenyButton: true,
        confirmButtonText: 'Remove',
        denyButtonText: `cancel`,
        }).then((result) => {

         if (result.isConfirmed) {
          Swal.fire('Product Removed!', '', 'success')

            dispatch(deleteProducts(id))

         } else if (result.isDenied) {
    Swal.fire('Cancelled', '', 'info')
       }
        })
    }
    
    const createProductHandler =() =>{
        dispatch(createProducts())
    }

    return (
        <>
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='my-3'
                onClick={createProductHandler}
                > <i className="fas fa-plus"></i> Create Products
                </Button>
            </Col>
        </Row>
        {loading ? <Loader /> : error ? <Message variant ='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>                   
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button  
                                variant='danger' 
                                className='btn-sm' 
                                onClick={()=> deleteHandler(product._id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody> 
            </Table>
        )}
            
        </>
    )
}

export default ProductList

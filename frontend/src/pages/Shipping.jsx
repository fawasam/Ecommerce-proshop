import React, {  useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Button ,Form ,FormControl,FormGroup,FormLabel, Row} from 'react-bootstrap'
import FormContainer from '../components/FormContainer.jsx'
import {saveShippingAddress} from '../redux/actions/cartActions.js'
import CheckOutStep from '../components/CheckOutStep.jsx'

const Shipping = ({history}) => {

    const dispatch =useDispatch()
    const cart =useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] =useState(shippingAddress.address) 
    const [city,setCity] =useState(shippingAddress.city) 
    const [postalcode,setPostalcode] =useState(shippingAddress.postalcode) 
    const [country,setCountry] =useState(shippingAddress.country) 

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address ,city ,postalcode,country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckOutStep step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
             <FormGroup controlId='address'>
                   <FormLabel>Address</FormLabel>
                   <FormControl 
                   type='text' 
                   placeholder='Enter Your address'
                   value={address}
                   required
                   onChange={(e)=>setAddress(e.target.value)}>
                   </FormControl>
               </FormGroup>
             <FormGroup controlId='city'>
                   <FormLabel>City</FormLabel>
                   <FormControl 
                   type='text' 
                   placeholder='Enter Your city'
                   value={city}
                   required
                   onChange={(e)=>setCity(e.target.value)}>
                   </FormControl>
               </FormGroup>
             <FormGroup controlId='postalcode'>
                   <FormLabel>Postalcode</FormLabel>
                   <FormControl 
                   type='text' 
                   placeholder='Enter Your postalcode'
                   value={postalcode}
                   required
                   onChange={(e)=>setPostalcode(e.target.value)}>
                   </FormControl>
               </FormGroup>
             <FormGroup controlId='country'>
                   <FormLabel>Country</FormLabel>
                   <FormControl 
                   type='text' 
                   placeholder='Enter Your country'
                   value={country}
                   required
                   onChange={(e)=>setCountry(e.target.value)}>
                   </FormControl>
               </FormGroup>
               <Row className='py-4'>
               <Button  type='submit' variant='primary'>
                   Continue
               </Button>
               </Row>
            </Form>
        </FormContainer>
    )
}

export default Shipping

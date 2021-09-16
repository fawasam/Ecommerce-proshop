import React, {  useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Button ,Form ,FormGroup,FormLabel, Row ,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer.jsx'
import {savePaymentMethod} from '../redux/actions/cartActions.js'
import CheckOutStep from '../components/CheckOutStep.jsx'

const Payment = ({history}) => {

    const dispatch =useDispatch()
    const cart =useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod,setPaymentMethod] =useState('Paypal') 

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckOutStep step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
             <FormGroup controlId='address'>
                   <FormLabel as='legend'>Select Method</FormLabel>
                   <Col>
                   <Form.Check 
                   type='radio' 
                   label='Paypal or Credit Card' 
                   id='Paypal'
                   name='paymentMethod'
                   checked
                   value='Paypal'
                   onChange={(e)=>setPaymentMethod(e.target.value)}
                   >
                   </Form.Check>
                   <Form.Check 
                   type='radio' 
                   label='Stripe'
                   id='Stripe' 
                   name='paymentMethod'
                   value='Stripe'
                   onChange={(e)=>setPaymentMethod(e.target.value)}
                   >
                   </Form.Check>
                   </Col>
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

export default Payment
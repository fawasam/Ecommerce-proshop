import React, { useEffect, useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Link } from 'react-router-dom'
import {Row ,Col, Button ,Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {register} from "../redux/actions/userAction.js"
import FormContainer from '../components/FormContainer.jsx'
import Message from '../components/Message.jsx'

const Register = ({location , history}) => {

    const [name ,setName] =useState('')
    const [email ,setEmail] =useState('')
    const [password ,setPassword] =useState('')
    const [confirmPassword ,setConfirmPassword] =useState('')
    const [message ,setMessage] =useState(null)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch =useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { error , userInfo } =userRegister

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history ,userInfo , redirect])

    const submitHandler =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }
        else{
            dispatch(register(name,email,password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
           <Form onSubmit={submitHandler}>

               <FormGroup controlId='name'>
                   <FormLabel>Username</FormLabel>
                   <FormControl 
                   type='name' 
                   placeholder='Enter name'
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='email'>
                   <FormLabel>Email Address</FormLabel>
                   <FormControl 
                   type='email' 
                   placeholder='Enter email'
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='password'>
                   <FormLabel>Password</FormLabel>
                   <FormControl 
                   type='password' 
                   placeholder='Enter password'
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='confirmPassword'>
                   <FormLabel>Confirm Password</FormLabel>
                   <FormControl 
                   type='password' 
                   placeholder='Confirm password'
                   value={confirmPassword}
                   onChange={(e)=>setConfirmPassword(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>
               <Button  className='mt-3' type='submit'variant='primary'>
                   Register
               </Button>
           </Form>
           <Row className='py-3'>
               <Col>
               Already have an account ? 
               <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>
                Login</Link>
               </Col>
           </Row>
        </FormContainer>
    )
}

export default Register

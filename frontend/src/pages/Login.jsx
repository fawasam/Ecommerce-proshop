import React, { useEffect, useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Link } from 'react-router-dom'
import {Row ,Col, Button ,Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {login} from "../redux/actions/userAction.js"
import FormContainer from '../components/FormContainer.jsx'
import Message from '../components/Message.jsx'

const Login = ({location , history}) => {
    const [email ,setEmail] =useState('')
    const [password ,setPassword] =useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch =useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { error , userInfo } =userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history ,userInfo , redirect])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
           <Form onSubmit={submitHandler}>
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
               <Button  className='mt-3' type='submit'variant='primary'>
                   Sign In
               </Button>
           </Form>
           <Row className='py-3'>
               <Col>
               New Customer ? 
               <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>
                Register</Link>
               </Col>

           </Row>
        </FormContainer>
    )
}

export default Login

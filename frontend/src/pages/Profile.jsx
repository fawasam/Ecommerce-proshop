import React, { useEffect, useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Row ,Col, Button ,Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {getUserDetails ,UpdateuserDetails} from "../redux/actions/userAction.js"
import Loader from '../components/Loader'
import Message from '../components/Message.jsx'

const Profile = ({location , history}) => {

    const [name ,setName] =useState('')
    const [email ,setEmail] =useState('')
    const [password ,setPassword] =useState('')
    const [confirmPassword ,setConfirmPassword] =useState('')
    const [message ,setMessage] =useState(null)

    const dispatch =useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading , error , user } =userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } =userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success } =userUpdateProfile


    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch (getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }

        }
    },[history ,userInfo , dispatch ,user ])


    const submitHandler =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }
        else{
            //dipatch udpader profile 
            dispatch(UpdateuserDetails({id:user._id , name  ,email , password}))
        }
    }
    return (
        <Row>
            <Col md={4}>
  <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile updated</Message>}
            {loading && <Loader />}
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
                   Update
               </Button>
           </Form>
            </Col>
            <Col md={8}>
                <h2>My orderes</h2>        
            </Col>
        </Row>

    )
}

export default Profile

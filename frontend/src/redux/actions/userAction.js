import axios from 'axios'
import Swal from 'sweetalert2'

import { 
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS

} from "../constants/constants"

//toast bar
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


//login action

export const login = (email ,password) => async (dispatch) =>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post("/api/users/login" , {email ,password},config)
        Toast.fire({
           icon: 'success',
           title: 'log in successfully'
        })
          
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo' , JSON.stringify(data))

    } catch (error) {
            dispatch({ 
            type:USER_LOGIN_FAIL , 
            payload :'Invalid credentials'
        })
    }
}

export const logout =()=>(dispatch) =>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    // localStorage.removeItem('shippingAddress')
    // localStorage.removeItem('paymentMethod')
        Toast.fire({
           icon: 'success',
           title: 'You have been logged out successfully'
        })   
    dispatch({type:USER_LOGOUT})
}


//register

export const register = (name ,email ,password) => async (dispatch) =>{
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post("/api/users" , {name,email ,password},config)

        //if user register success then dispatch both register and login
       Swal.fire({
         title: 'Registration completed',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          })        
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data,
        })

       dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo' , JSON.stringify(data))

    } catch (error) {
            dispatch({ 
            type:USER_REGISTER_FAIL , 
            payload :'Invalid credentials'
        })
    }
}


export const getUserDetails = (id) => async (dispatch , getState ) =>{
    try {

        dispatch({
            type:USER_DETAILS_REQUEST
        })
 
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config)

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:USER_DETAILS_FAIL , 
            payload :error.message
        })
    }
}


export const UpdateuserDetails = (user) => async (dispatch , getState ) =>{
    try {

        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users//profile`,user ,config)

       Swal.fire({
         title: 'Profile Updated',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          })  
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:USER_UPDATE_PROFILE_FAIL , 
            payload :error.message
        })
    }
}
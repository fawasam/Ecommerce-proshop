import axios from "axios"
import Swal from 'sweetalert2'

import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    // ORDER_PAY_RESET,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS
} from "../constants/constants"




export const createOrder = (order) => async (dispatch , getState ) =>{
    try {

        dispatch({
            type:ORDER_CREATE_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/orders`,order ,config)

        console.log(data)
       Swal.fire({
         title: 'Order Placed',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          })  
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:ORDER_CREATE_FAIL , 
            payload :error.message
        })
    }
}


export const getOrderDetails = (id) => async (dispatch , getState ) =>{
    console.log('hello');
    
    try {
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
 
        //GET USER INFO AS TOKEN 
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`,config)
        console.log(data);

    //    Swal.fire({
    //      title: 'Order Placed',
    //      text: 'Successfully',
    //      icon: 'success',
    //      showConfirmButton: false,
    //       })  
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:ORDER_DETAILS_FAIL , 
            payload :error.message
        })
    }
}

export const payOrder = (orderId ,paymentResult) => async (dispatch , getState ) =>{
    try {
        dispatch({
            type:ORDER_PAY_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                 'Content-Type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult , config)

       Swal.fire({
         title: 'Payment',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          })  
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:ORDER_PAY_FAIL , 
            payload :error.message
        })
    }
}







export const listMyOrder = () => async (dispatch , getState ) =>{
    try {
        dispatch({
            type:ORDER_MY_LIST_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/myorders` , config)
        console.log(data)
        
        dispatch({
            type:ORDER_MY_LIST_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:ORDER_MY_LIST_FAIL , 
            payload :error.message
        })
    }
}
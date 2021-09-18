import { createStore ,combineReducers ,applyMiddleware} from 'redux'
import  thunk from 'redux-thunk'
import {composeWithDevTools } from 'redux-devtools-extension'
import { 
    productReducer,
    productDetailsReducer ,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer
} from "./redux/reducers/productReducer"
import { 
    cartReducer
} from "./redux/reducers/cartReducer.js"
import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './redux/reducers/userReducer.js'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer
} from './redux/reducers/orderReducer.js'


const reducer =combineReducers({
    productList:productReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
})


//LOCAL STORAGE 
const  cartItemsFromStorage =localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const  userInfoFromStorage =localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const  shippingAddressFromStorage =localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const  paymentMethodFromStorage =localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}


const initialState ={
    cart :{cartItems : cartItemsFromStorage ,shippingAddress :shippingAddressFromStorage , paymentMethod : paymentMethodFromStorage} ,
    userLogin : { userInfo : userInfoFromStorage}, 

}


const middleware =[thunk]
const store =createStore(reducer,initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store
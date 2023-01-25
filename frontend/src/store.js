import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productListReducer, productDetailsReducers} from './reducers/productReducer';
import {cartReducer} from './reducers/cartReducer'
import {userLoginReducer, userRegisterReducer,userDetailsReducer, userUpdateProfileReducer} from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducer'


const shippingAdressFromStorage = localStorage.getItem('shippingAdress')
  ? JSON.parse(localStorage.getItem("shippingAdress"))
  : {}

const userInfoFromStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem('userInfo')):null


const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reducer = combineReducers({
  productList: productListReducer, 
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer
});


const initialState = {
  // cart: {cartItems: "priyanshu"},
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAdressFromStorage
  },
  userLogin: {userInfo: userInfoFromStorage},
};


const middleware = [thunk];


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
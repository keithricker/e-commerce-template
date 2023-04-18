import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './cart/cart-slice'
import { userReducer } from './user/user-slice'
import { shopReducer } from './shop/shop-slice'

export const rootReducer = {
  user:userReducer,
  cart:cartReducer,
  shop: shopReducer
}

export const store = configureStore({
  reducer: rootReducer
})

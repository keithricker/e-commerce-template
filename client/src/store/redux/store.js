import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './cart/cart-slice'
import { directoryReducer } from './directory/directory-slice'
import { userReducer } from './user/user-slice'
import { shopReducer } from './shop/shop-slice'

export const rootReducer = {
  user:userReducer,
  cart:cartReducer,
  directory:directoryReducer,
  shop: shopReducer
}

export const store = configureStore({
  reducer: rootReducer
})

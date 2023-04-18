import { createSlice, current } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'cart',
  initialState: {
    hidden: true,
    cartItems: []
  },
  reducers: {
    toggleItems(state) {  
      return {
        ...state,
        hidden: !state.hidden
      }
    },
    addItem(state,action) {
      state = current(state)
      const cartItems = state.cartItems
      const cartItemToAdd = action.payload
      const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

      if (existingCartItem) {
         const updatedCart = cartItems.map(
            cartItem => {
               return cartItem.id === cartItemToAdd.id ? {
                  ...cartItem, quantity: cartItem.quantity +1
               } : cartItem
            }
          )
          return { ...state, cartItems:updatedCart }
       }
       return { ...state, cartItems: [...cartItems, { ...cartItemToAdd, quantity: 1 }] }
    },
    reduceItemQuantity(state,action) {
      state = current(state)
      const cartItems = state.cartItems
      const cartItemToReduce = cartItems.find(item => item.id === action.payload.id)
      const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToReduce.id);
      let updatedCart
      if (existingCartItem.quantity === 1) {
         updatedCart = cartItems.filter(item => item.id !== cartItemToReduce.id);
      } else {
        updatedCart = cartItems.map(item =>
         item.id === cartItemToReduce.id 
         ? { ...item, quantity: item.quantity -1 }
         : item
        )
      }
      return {
        ...state,
        cartItems: updatedCart
      }
    },
    clearItem(state,action) {
      state = current(state)
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      }      
    },
    clearCart(state) {
      return {
        ...state,
        cartItems:[]
      }
    },
  }
});

export const cartReducer = slice.reducer
export const cartActions = slice.actions
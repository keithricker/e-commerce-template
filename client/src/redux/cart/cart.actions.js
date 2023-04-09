import { CartActionTypes } from './cart.types';

export const toggleItems = () => ({
    type: CartActionTypes.TOGGLE_CART_ITEMS
});

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

export const reduceItemQuantity = item => ({
    type: CartActionTypes.REDUCE_QUANTITY,
    payload: item
})

export const clearItem = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART
})
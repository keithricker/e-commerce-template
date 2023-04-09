import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { cartActions } from '../../store/redux/cart/cart-slice';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems) || []
  const itemCount = cartItems.length
  const toggle = () => dispatch(cartActions.toggleItems())
  return (
    <div className='cart-icon' onClick={toggle}>
        { //<ShoppingIcon className='shopping-icon' /> 
        }
        <img alt="shopping bag" src="/img/bag.png" />
        <span className='item-count'>{itemCount}</span>
    </div>  
  )
}
export default CartIcon
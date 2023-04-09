import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { cartActions } from '../../../store/redux/cart/cart-slice';
import './cart-icon.styles.scss';
import Badge from '@mui/material/Badge';

const CartIcon = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems) || []
  const itemCount = cartItems.reduce((prev,curr) => prev + (curr.quantity || 0), 0)
  const toggle = () => dispatch(cartActions.toggleItems())
  return (
    <>
    <div className='cart-icon' onClick={toggle}>
      <Badge badgeContent={itemCount} color="primary">
          <img alt="shopping bag" src="/img/bag.png" />
      </Badge>
    </div>  
    </>
  )
}
export default CartIcon
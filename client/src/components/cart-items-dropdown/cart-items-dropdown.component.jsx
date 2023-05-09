import React, {useEffect} from 'react';
import CartItem from '../cart-item/cart-item.component';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../ui/custom-button/custom-button.component';
import { Drawer } from '@mui/material'
import { cartActions } from '../../store/redux/cart/cart-slice';
import { withRouter } from 'react-router-dom';
import './cart-items-dropdown.styles.scss';

const CartDrawer = function({history}) {
    const dispatch = useDispatch()
    const toggle = () => dispatch(cartActions.toggleItems())
    const cartItems = useSelector(state => state.cart.cartItems) || []
    
    const listener = ({target}) => {
      const classes = [ ...target.classList]
      if (classes.includes('MuiBackdrop-root') || classes.includes('MuiPaper-root')) {
        toggle()
      }
    }
    
    useEffect(() => {
      window.addEventListener('click',listener)
      return () => window.removeEventListener('click',listener)
    }) 
     
    return (
      <div className='cart-dropdown'>
        <Drawer open={true} anchor="right">
          <div className='cart-items'>
              {
              cartItems.length ? 
              cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
              :
              <span className="empty-message">Your cart is empty.</span>
              }
              {
              cartItems.length &&
                <CustomButton onClick={() => { 
                    history.push('/checkout');
                    toggle();
                }}>GO TO CHECKOUT</CustomButton>
              }
          </div>
        </Drawer>
    </div>
    )
}

export default withRouter(CartDrawer)

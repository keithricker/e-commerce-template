import React, {useEffect} from 'react';
import CartItem from '../cart-item/cart-item.component';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../ui/custom-button/custom-button.component';
import { cartActions } from '../../store/redux/cart/cart-slice';
import { withRouter } from 'react-router-dom';
import './cart-dropdown.styles.scss';

const CartDropdown = ({ history }) => {
    const dispatch = useDispatch()
    const toggle = () => dispatch(cartActions.toggleItems())
    const cartItems = useSelector(state => state.cart.cartItems) || []
    const listener = ({target}) => {
        const dropdown = document.querySelector('.cart-dropdown')
        if (dropdown && !dropdown.contains(target)) {
            toggle()
        }
    }
    useEffect(() => {
        window.addEventListener('click',listener)
        return () => window.removeEventListener('click',listener)
    }) 
    return (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
              cartItems.length ? 
              cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
              :
              <span className="empty-message">Your cart is empty.</span>
            }
        </div>
        {
        cartItems.length ?
        <CustomButton onClick={() => { 
            history.push('/checkout');
            toggle();
        }}>GO TO CHECKOUT</CustomButton>
        : null
        }
    </div>
)
}
export default withRouter(CartDropdown)

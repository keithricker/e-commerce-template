import React from 'react';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { withRouter } from 'react-router-dom';
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, toggle }) => (
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
const mapStateToProps = state => ({ 
    cartItems : selectCartItems(state)
})
const mapDispatchToProps = dispatch => ({
    toggle : () => dispatch(toggleCartHidden())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));

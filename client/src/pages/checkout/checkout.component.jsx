import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartItemsTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

import './checkout.styles.scss';


const CheckoutPage = ({cartItems, total}) => (
  <div className="checkout-page">
      {
        cartItems.map(item => <CheckoutItem key={item.id} cartItem={item} />)
      }
      <div className="total">
        <span class="total-text">TOTAL:&nbsp;</span><span class="total-amount">${total}</span>
      </div>
      <div className='test-warning'>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
      </div>
      <StripeCheckoutButton price={total} />
  </div>
)
const mapStateToProps = state => ({
  cartItems : selectCartItems(state),
  total : selectCartItemsTotal(state)
});
export default connect(mapStateToProps)(CheckoutPage);
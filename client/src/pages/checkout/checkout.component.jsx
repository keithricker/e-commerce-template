import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/ui/stripe-button/stripe-button.component'

import './checkout.styles.scss';

const CheckoutPage = () => {
  const getTotal = (items=[]) => items.reduce((prev,curr) => (curr.price * curr.quantity + prev),0)
  const cartItems = useSelector(state => state.cart.cartItems) || []
  const total = getTotal(cartItems)
  if (!total) return ( <h1>We got no total</h1> )
  return (
    <div className="checkout-page">
        {
          cartItems.map(item => <CheckoutItem key={item.id} cartItem={item} />)
        }
        <div className="total">
          <span className="total-text">TOTAL:&nbsp;</span><span className="total-amount">${total}</span>
        </div>
        <div className='test-warning'>
          *Please use the following test credit card for (mock) payments*
          <br />
          4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div>
        <StripeCheckoutButton price={total} />
    </div>
  )
}
export default CheckoutPage
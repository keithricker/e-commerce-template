import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { withCms } from '../../../cms';

const StripeCheckoutButton = (props) => {
  const { price,cms } = props
  const branding = { cms }
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_xYtLS9QFqAO646nlSGWbkVK600VgjaWS2v';

  const onToken = token => {
      axios({
        url: 'payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token
        }
      })
      .then(response => {
        alert('Payment Successful')
      })
      .catch(error => {
        alert('There was an error with your transaction. Please be sure to use the provided test credit card.')
      });
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name={branding.titleText}
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default withCms(StripeCheckoutButton);
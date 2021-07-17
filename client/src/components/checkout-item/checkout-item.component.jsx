import React from 'react';
import { connect } from 'react-redux';
import './checkout-item.styles.scss';
import { clearItemFromCart, addItem, reduceItemQuantity } from '../../redux/cart/cart.actions'

const CheckoutItem = ({ cartItem, clearItem, addItem, reduceItemQuantity }) => {
    const { name, imageUrl, price, quantity } = cartItem
    return (
    <div className='checkout-item'>
        <div className='checkout-column image-container'>
            <img src={imageUrl} alt="item" />
        </div>
        <span className="checkout-column name">{name}</span>
        <span className="checkout-column quantity">
            <div className="arrow" onClick={() => reduceItemQuantity(cartItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
        </span>
        <span className="checkout-column price">${price}</span>
        <div className="checkout-column remove-button" onClick={() => clearItem(cartItem)}>&#10005;</div>
    </div>
    )
}
const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    reduceItemQuantity: item => dispatch(reduceItemQuantity(item)),
    addItem: item => dispatch(addItem(item))
})
export default connect(null, mapDispatchToProps)(CheckoutItem);
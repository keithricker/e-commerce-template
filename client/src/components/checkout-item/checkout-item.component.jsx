import React from 'react';
import { connect } from 'react-redux';
import './checkout-item.styles.scss';
import { clearItemFromCart, addItem, reduceItemQuantity } from '../../redux/cart/cart.actions'

const CheckoutItem = ({ cartItem, clearItem, addItem, reduceItemQuantity }) => {
    const removeItemFromDom = (ev,item) => {
        const parent = ev.target.parentNode
        Object.assign(parent.style,{
            transition: "all 0.5s",
            'min-height': "0px",
            height: "0px",
            opacity: "0",
            padding: "0px"
        })
        window.setTimeout(() => {
            clearItem(item)
        },500)
    }
    const { name, imageUrl, price, quantity } = cartItem
    return (
    <div className='checkout-item'>
        <div className='checkout-column image-container'>
            <img src={imageUrl} alt="item" />
        </div>
        <span className="checkout-column name">{name}</span>
        <span className="checkout-column quantity">
            <span className="arrow" onClick={() => reduceItemQuantity(cartItem)}>&#10094;</span>
                <span className="value">{quantity}</span>
            <span className="arrow" onClick={(ev) => addItem(cartItem)}>&#10095;</span>
        </span>
        <span className="checkout-column price">${price}</span>
        <div className="checkout-column remove-button" onClick={(ev) => removeItemFromDom(ev,cartItem)}>&#10005;</div>
    </div>
    )
}
const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    reduceItemQuantity: item => dispatch(reduceItemQuantity(item)),
    addItem: item => dispatch(addItem(item))
})
export default connect(null, mapDispatchToProps)(CheckoutItem);
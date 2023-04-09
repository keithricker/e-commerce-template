import React from 'react';
import { useDispatch } from 'react-redux';
import './checkout-item.styles.scss';
import { cartActions } from '../../store/redux/cart/cart-slice'

const CheckoutItem = ({cartItem}) => {
    const { clearItem, addItem, reduceItemQuantity } = cartActions
    const dispatch = useDispatch()
    const clear = () => dispatch(clearItem(cartItem))
    const subtract = () => dispatch(reduceItemQuantity(cartItem))
    const add = () => dispatch(addItem(cartItem))
    const removeItemFromDom = (ev) => {
        const parent = ev.target.parentNode
        Object.assign(parent.style,{
            transition: "all 0.5s",
            'min-height': "0px",
            height: "0px",
            opacity: "0",
            padding: "0px"
        })
        window.setTimeout(() => {
            clear()
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
            <span className="arrow" onClick={() => subtract()}>&#10094;</span>
                <span className="value">{quantity}</span>
            <span className="arrow" onClick={() => add()}>&#10095;</span>
        </span>
        <span className="checkout-column price">${price}</span>
        <div className="checkout-column remove-button" onClick={(ev) => removeItemFromDom(ev)}>&#10005;</div>
    </div>
    )
}
export default CheckoutItem
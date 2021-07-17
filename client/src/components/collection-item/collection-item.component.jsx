import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const cartIcon = require('@fortawesome/free-solid-svg-icons').faCartPlus

const CollectionItem = ({ item, addItem }) => {
    let amount = 0
    const addToCart = (cartItem) => { 
        const element = document.querySelector(`[data-id="${item.id}"] .custom-button .button-text`)
        amount++
        element.style['font-size'] = '70%'
        element.innerHTML = `ADD TO CART  &nbsp;<span style="text-transform:lowercase">amount: ${amount}</span>`
        addItem(cartItem) 
    }
    const { name, price, imageUrl } = item;
    return (
        <div className="collection-item" data-id={item.id}>
            <div className="imageWrapper">
            <img className="image" src={imageUrl} alt={name} loading="lazy" />
            </div>
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton onClick={() => addToCart(item)} inverted>
                <span><FontAwesomeIcon icon={cartIcon} /></span>
                <span className="button-text">ADD TO CART</span>
            </CustomButton>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})
export default connect(null,mapDispatchToProps)(CollectionItem);
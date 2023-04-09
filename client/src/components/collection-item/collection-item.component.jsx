import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { cartActions } from '../../store/redux/cart/cart-slice';
import CustomButton from '../ui/custom-button/custom-button.component';
import './collection-item.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

const cartIcon = faCartPlus

const CollectionItem = ({ item }) => {
    const cartItems = useSelector(state => state.cart.cartItems)
    const matchingItem = cartItems.find(_item => _item.id === item.id)
    const quantity = matchingItem ? matchingItem.quantity : 0
    const dispatch = useDispatch()
    const addItem = cartItem => dispatch(cartActions.addItem(cartItem)) 
    const addToCart = (cartItem) => { 
      addItem(cartItem) 
    } 
    const { name, price, imageUrl } = item;
    const quantityJsx = quantity ? <span style={{textTransform:"lowercase"}}>&nbsp;quantity: {quantity}</span> : ''
    return (
        <div className="collection-item" data-id={item.id}>
            <div className="imageWrapper">
              <img className="image" src={imageUrl} alt={name} loading="lazy" />
            </div>
            <CustomButton onClick={() => addToCart(item)} inverted>
                <span><FontAwesomeIcon icon={cartIcon} /></span>
                <span className="button-text">ADD TO CART {quantityJsx}</span>
            </CustomButton>
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
        </div>
    )
}

export default CollectionItem
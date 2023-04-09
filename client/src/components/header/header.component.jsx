import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { userThunks } from '../../store/redux/user/user-slice';

const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const hidden = useSelector(state => state.cart ? state.cart.hidden : true)
  const signOut = () => dispatch(userThunks.signOut())
  return (
  <div className="header clearfix">
      <Link to="/">
        <div className="branding"><h2>Widgets Unlimited</h2></div>
      </Link>
            
      <div className="options">
          <Link to="/shop">
            <div className="option">SHOP</div>
          </Link>
          <Link to="/contact">
            <div className="option">CONTACT</div>
          </Link>
          {
            currentUser ?
            <div className="option" onClick={signOut}>SIGN OUT</div>
            :
            <Link to="/signin">
              <div className="option">SIGN IN</div>
            </Link>
          }
          <CartIcon />
      </div>
      {
      hidden ? null :
      <CartDropdown />
      }
  </div>
  )
}

export default Header
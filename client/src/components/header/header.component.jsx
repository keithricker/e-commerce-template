import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartIcon from '../ui/cart-icon/cart-icon.component'
import CartDropdown from '../cart-items-dropdown/cart-items-dropdown.component';
import { userThunks } from '../../store/redux/user/user-slice';
import { withCms } from '../../cms';

const Header = ({cms}) => {
  
  const { branding } = cms
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const hidden = useSelector(state => state.cart ? state.cart.hidden : true)
  const signOut = () => dispatch(userThunks.signOut())
  const { brandingText, titleText, titleColor } = branding

  document.title = titleText

  return (
  <div className="header clearfix">
      <Link to="/">
        <div className="branding"><h2 style={{color:titleColor}}>{titleText}</h2></div>
        { brandingText && <p className="brandingText">{brandingText}</p> }
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
export default withCms(Header)
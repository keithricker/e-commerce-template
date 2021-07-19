import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => {
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
            <div className="option" onClick={signOutStart}>SIGN OUT</div>
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
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});
const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React, {Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions'

const HomePage = lazyLoad(() => import('./pages/homepage/homepage.component'))
const SignInAndSignUpPage = lazyLoad(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazyLoad(() => import('./pages/checkout/checkout.component'));
const ContactPage = lazyLoad(() => import('./pages/contact/contact.component'));
const ShopPage = lazyLoad(() => import('./pages/shop/shop.component'));
const Header = lazyLoad(() => import('./components/header/header.component'));

function lazyLoad(importFunc) {
  const Component = React.lazy(importFunc)
  return () => <Suspense fallback={<div>Loading ...</div>}><Component /></Suspense>
}

class App extends React.Component {
  unsubscribeFromAuth = null;
  
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    console.log("component unmounting");
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/contact' component={() => <ContactPage />} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={
            () => this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
          } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

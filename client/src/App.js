import React, {Suspense,useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
// import { selectCurrentUser } from './redux/user/user.selector';
// import { checkUserSession } from './redux/user/user.actions'
import { userThunks } from './store/redux/user/user-slice';

const { checkUserSession } = userThunks
const HomePage = lazyLoad(() => import('./pages/homepage/homepage.component'))
const SignInAndSignUpPage = lazyLoad(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazyLoad(() => import('./pages/checkout/checkout.component'));
const ContactPage = lazyLoad(() => import('./pages/contact/contact.component'));

function lazyLoad(importFunc) {
  const Component = React.lazy(importFunc)
  return () => <Suspense fallback={<div>Loading ...</div>}><Component /></Suspense>
}

const App = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    dispatch(checkUserSession())
  },[dispatch])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/contact' component={ContactPage} />
        
          
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={
          () => currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
        } />
        
       
      </Switch>
    </div>
  )

}

export default App

/*
const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
*/
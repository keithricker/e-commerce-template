import React, { Suspense,useEffect,useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import { userThunks } from './store/redux/user/user-slice';
import SimpleBackdrop from './components/ui/backdrop/backdrop';
import Button from '@mui/material/Button';

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
  const user = useSelector(state => state.user)
  const currentUser = user.currentUser
  const [showDetails,setShowDetails] = useState(false)

  useEffect(() => {
    dispatch(checkUserSession())
  },[dispatch])

  const Details = () => (
    <div>
      <h3>Features:</h3>
      <ul>
        <li>Single Page App with Persistence (via redux persist)</li>
        <li>Pages: Home, Shop, Contact</li>
        <li>E-commerce (mock) enabled</li>
        <li>Payment processing using Stripe</li>
        <li>User Authentication using Firebase (enabled)</li>
        <li>Redux State Management (Redux Toolkit)</li>
        <li>Accessibility</li>
        <li>Server-side Rendered</li>
        <li>High Performance Metrics.</li>
      </ul>
    </div>
  )

  return (
    <>
    <SimpleBackdrop style={{opacity:'0.8',cursor:'pointer'}}>
      <>
      {
        showDetails ? <Details />
        :
        <div style={{textAlign:'center'}}>
          <h2>This is a functional (demo) e-commerce app built with React and Typescript</h2>
          <div>Among it's features is it's ability to serve as a headless CMS with either Wordpress or Drupal,
            but can be made to work with any API.
          </div>
          <br />
          <div>Branding and Shop Items can be managed in the CMS (For demo purposes, we're using a Dairy Supplier). </div>
          <br />
          <a href="https://codesandbox.io/s/github/keithricker/e-commerce-template">
            <Button>View the Code on Codesandbox</Button>
          </a>
          <div>
            <Button onClick={() => setShowDetails(true)}>More Detail about the App</Button>
          </div>
        </div>
      }
      </>
    </SimpleBackdrop>
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
    </>
  )
}
export default App
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

/*
const Page1 = ({match}) => {
    console.log(match);
    return (
    <h1>Page 1</h1>
    )
};
const Page2 = ({match}) => { 
    console.log(match);
    return (
    <h1>Page 2</h1>
    )
};
const Page3 = (match) => {
    console.log(match);
    return (
    <h1>Page 3</h1>
    )
};
const Item = () => {
    return (
        <h1>Item</h1>
    )
}

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Page1} />
            <Route exact path="/page2" component={Page2} />
            <Route path="/page2/:hello" component={Page2} />
            <Route path="/page3" component={Page3} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
*/
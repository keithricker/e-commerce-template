import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import Persistence, { store as persistentStore } from './store/redux/persistence';

ReactDOM.render(
    <Provider store={persistentStore}>
        <BrowserRouter>
             <Persistence>
                <App />
             </Persistence>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
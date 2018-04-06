import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
, document.getElementById('app'));
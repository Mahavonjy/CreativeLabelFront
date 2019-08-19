import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {combineReducers, createStore} from 'redux';
import rootReducer from './reducer/reducer';
import playerReducer from './reducer/Player';

ReactDOM.render(
    <Provider store={createStore(rootReducer)} >
        <App />
    </Provider>
    , document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
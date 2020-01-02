import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import profileReducer from './reducer/Profile';
import beatsReducer from './reducer/Beats';
import PlaylistHomeReducer from "./reducer/Home";
import cartsReducer from "./reducer/Carts";
import playersReducer from "./reducer/Players";
import kantoBizForm from "./reducer/KantoBiz/Form";
import KantoBizSearchResults from "./reducer/KantoBiz/SearchResult";
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk"

const Reducers = combineReducers({
    "beats": beatsReducer,
    "profile": profileReducer,
    "Home": PlaylistHomeReducer,
    "Player": playersReducer,
    "Carts": cartsReducer,
    "KantoBizForm": kantoBizForm,
    "KantobizSearch": KantoBizSearchResults
});

const store = createStore(Reducers, undefined, compose(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    , document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

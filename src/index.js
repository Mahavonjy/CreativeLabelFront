import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import profileReducer from './reducer/Profile/Profile';
import profilePrestations from './reducer/Profile/Prestation';
import beatsReducer from './reducer/Beats';
import PlaylistHomeReducer from "./reducer/Home";
import cartsReducer from "./reducer/Carts";
import Others from "./reducer/Others/Others";
import playersReducer from "./reducer/Players";
import kantoBizForm from "./reducer/KantoBiz/Form";
import { sessionService, sessionReducer } from 'redux-react-session';
import KantoBizSearchResults from "./reducer/KantoBiz/SearchResult";
import KantoBizSearch from "./reducer/Search/KantoSearch";
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import Conf from "./Config/tsconfig";
import axios from 'axios';

axios.defaults.baseURL = Conf.configs.ServerApi;

const Reducers = combineReducers({
    "Others": Others,
    session: sessionReducer,
    "beats": beatsReducer,
    "profile": profileReducer,
    "profilePrestations": profilePrestations,
    "Home": PlaylistHomeReducer,
    "Player": playersReducer,
    "Carts": cartsReducer,
    "KantoBizForm": kantoBizForm,
    "KantobizSearch": KantoBizSearchResults,
    "KantobizSearchInfo": KantoBizSearch
});

const store = createStore(Reducers, undefined, compose(applyMiddleware(thunkMiddleware)));
sessionService.initSessionService(store, { driver: 'COOKIES' });

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

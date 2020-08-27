import React, {useEffect, useRef} from "react";
import {BrowserRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import HomeRoot from "./components/home/homeRoot";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import Others from "./reducer/Others/Others";
import {sessionReducer, sessionService} from "redux-react-session";
import beatsReducer from "./reducer/Beats";
import profileReducer from "./reducer/Profile/Profile";
import profilePrestations from "./reducer/Profile/Prestation";
import PlaylistHomeReducer from "./reducer/Home";
import playersReducer from "./reducer/Players";
import cartsReducer from "./reducer/Carts";
import kantoBizForm from "./reducer/KantoBiz/Form";
import CommandSuccess from "./reducer/CommandSuccess/success";
import KantoBizSearchResults from "./reducer/KantoBiz/SearchResult";
import KantoBizSearch from "./reducer/Search/KantoSearch";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";

function App() {

    const isMounted = useRef(false);

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
        "CommandSuccess": CommandSuccess,
        "KantobizSearch": KantoBizSearchResults,
        "KantobizSearchInfo": KantoBizSearch
    });

   const store = createStore(Reducers, undefined, compose(applyMiddleware(thunkMiddleware)));
    sessionService.initSessionService(store, {driver: 'COOKIES'});

    useEffect(() => {

        // document.addEventListener('contextmenu', function(e) {
        //     e.preventDefault();
        // });
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <HomeRoot/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

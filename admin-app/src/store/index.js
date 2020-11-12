import {applyMiddleware, createStore,compose} from 'redux';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import reducer  from "../reducers";
import thunk from 'redux-thunk'
const store=createStore(reducer
    
    ,applyMiddleware(thunk))

export default store


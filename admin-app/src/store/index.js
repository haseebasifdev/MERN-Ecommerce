import {applyMiddleware, createStore,compose} from 'redux';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import reducer  from "../reducers";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
const store=createStore(reducer,composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  ))

export default store


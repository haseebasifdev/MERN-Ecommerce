import React, { useEffect, } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/privateRoutes';

import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
function App() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!auth.authencate) {
      dispatch(isLoggedIn())
    }
  }, [])
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path='/' exact component={Home} />
        <PrivateRoute path='/products'  component={Products} />
        <PrivateRoute path='/orders'  component={Orders} />
        <PrivateRoute path='/category'  component={Category} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

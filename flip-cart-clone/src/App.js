import './App.css';
import Homepage from './container/HomePage';
import {BrowserRouter as Router,Switch,Route  } from 'react-router-dom';
import ProductListPage from './container/ProductListPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/:slug'  component={ProductListPage} />
        </Switch>
      </Router>
     {/* <Homepage/> */}
    </div>
  );
}

export default App;

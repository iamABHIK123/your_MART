import { Route,  Routes } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import {BrowserRouter} from 'react-router-dom';
// import { GetData } from './components/GetData';
import {Navbar} from './components/Navbar';
import { Contents } from './components/Contents';
import { ShoppingCart } from './components/Shopping-Cart';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      {/* Routes: To render a single component, wrap all the routes inside the Routes Component ;By default, routes are inclusive which means more than one Route component can match the URL path and render at the same time. If we want to render a single component, we need to use routes.*/}
      <Routes>
        <Route path='/shopping-cart' element={<ShoppingCart/>}></Route>
        <Route path='/' element={<Contents/>}></Route>
        {/* component={Contents} */}
      </Routes>
      </Router>
    </div>

  );
}

export default App;

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

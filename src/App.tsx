import * as React from "react";
import './App.css';
import NavBar from './components/Navbar/Navbar';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/About/About';
import Home from './components/Home/Home';
import Error404 from './components/Error404/Error404';
import ItemDetailContainer from './components/Containers/ItemListContainer/ItemDetailContainer';
import { ContextCard } from './Context/CardContext';
import CartView from './components/CartView/CartView';
import PayOrder from './components/PayOrder/PayOrder';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from './components/Login/Login';
import Register from "./components/Register/Register";
import Reset from "./components/Reset/Reset";
import { userId } from './components/services/FirebaseConfig';
import HistoryOrders from './components/HistoryOrders/HistoryOrders';

function App() {
  
  const { totalUnits, isEmpty, cart, setCart } = React.useContext(ContextCard);
  React.useEffect(() => {
    if(performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      if(localStorage.length > 0 && localStorage.getItem('itemsCart') !== null){
        const itemsCart = JSON.parse(localStorage.getItem('itemsCart')??'');
        setCart(itemsCart??'');
      }
    }
  
  }, [setCart])
  

  const location = useLocation();
  return (
      <div className="App">
        <NavBar quantityProduct={totalUnits} />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={1000}>
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Navigate to={'/'} replace />} />
          <Route path='/:id' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/detail:id' element={<ItemDetailContainer />} />
          <Route path='/CartView' element={<CartView />} />
          <Route path='/PayOrder' element={(userId !== "" && !isEmpty(cart)) ? <PayOrder /> : <Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          {/* <Route path='/History' element={<HistoryOrders />} /> */}
          <Route path='/Reset' element={<Reset />} />
          <Route path='/Error' element={<Error404 /> } /> 
          <Route path='*' element={<Error404 />} /> 
        </Routes>
        </CSSTransition>
        </TransitionGroup>
        <footer className='App-footer'>
          Footer
        </footer>
      </div>
  );
} 
export default App;

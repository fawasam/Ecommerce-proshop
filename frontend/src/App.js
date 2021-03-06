import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  
} from "react-router-dom";


import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Main from './pages/Main';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/OrderPage';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import OrderList from './pages/OrderList';


function App() {
  return (
    <Router>
    <Header/>
      <main className='py-3'>
        <Container>

          {/* http://localhost:5000/ */}
          <Route path="/" exact component={Main}/>
          <Route path="/products" exact component={Home} />
          <Route path="/products/search/:keyword"  component={Home}  />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register}  />
          <Route path="/profile" exact component={Profile}   />
          <Route path="/admin/userList" exact component={UserList}    />
          <Route path="/admin/user/:id/edit" exact component={UserEdit}     />
          <Route path="/shipping" exact component={Shipping}    />
          <Route path="/payment"  component={Payment}   />
          <Route path="/placeorder"  component={PlaceOrder}   />
          <Route path="/order/:id"  component={Order}   />
          <Route path="/cart/:id?" exact component={Cart}  />
          <Route path="/products/:id" exact component={ProductPage} />
          <Route path="/admin/productList"  exact component={ProductList}     />
          <Route path="/admin/product/:id/edit" exact component={ProductEdit}  />
          <Route path="/admin/orderList"  component={OrderList}  />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;

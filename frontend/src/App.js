import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap'
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Header/>
      <main className='py-3'>
        <Container>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" exact component={ProductPage} />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;

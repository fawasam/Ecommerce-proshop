import React from 'react'
import {useHistory  } from 'react-router-dom'
import {Container,Navbar,Nav,NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch , useSelector} from "react-redux"
import { logout } from '../redux/actions/userAction'
// import SearchBox from './SearchBox'

const Header = () => {

   const history = useHistory()
    const dispatch =useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } =userLogin

    const logoutHandler =()=>{
      history.push('/')
      dispatch(logout())
    }

    return (
<>

<Navbar bg="light" expand="lg" bg='dark' variant ='dark' collapseOnSelect>
  <Container>
    <LinkContainer to="/">
    <Navbar.Brand>Proshop</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {/* <Route render={({history})=> <SearchBox history={history} />} /> */}
      <Nav className="ms-auto">
        <LinkContainer to="/products" >
        <Nav.Link > 
          Products
        </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/cart" >
        <Nav.Link > 
          <i className='fas fa-shopping-cart'></i>   Cart
        </Nav.Link>
        </LinkContainer>
        {userInfo ? (
          <NavDropdown title={userInfo.name} id='username'>
            <LinkContainer to='/profile'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        ):(
        <LinkContainer to="/login">
        <Nav.Link >  

          <i className='fas fa-user'></i>   Sign In
          </Nav.Link>
        </LinkContainer>
         )}
         {userInfo && userInfo.isAdmin && (

           <NavDropdown title='Admin' id='admin'>
            <LinkContainer to='/admin/userList'>
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/productList'>
              <NavDropdown.Item>ProductList</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/orderList'>
              <NavDropdown.Item>OrderList</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>  
         )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        </>
    )
}

export default Header


/*

ml-auto => ms-auto (start)
mr-auto => me-auto (end)

*/
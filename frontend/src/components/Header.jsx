import React from 'react'
import {Container,Navbar,Nav,NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const Header = () => {
    return (
        <>
<Navbar bg="light" expand="lg" bg='dark' variant ='dark' collapseOnSelect>
  <Container>
    <LinkContainer to="/">
    <Navbar.Brand>Proshop</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <LinkContainer to="/cart" >
        <Nav.Link > 
          <i className='fas fa-shopping-cart'></i>   Cart
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
        <Nav.Link >  
          <i className='fas fa-user'></i>   Sign In
          </Nav.Link>
        </LinkContainer>

        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
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
import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Navbar, Nav} from 'react-bootstrap'

const Header = () => {

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>

          <LinkContainer to='/'>
            <Navbar.Brand>Fit Tracker</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to='/'>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"/>Exercises
                </Nav.Link>
              </LinkContainer> 

              <LinkContainer to='/create'>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"/>Add log
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to='/user'>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"/>Create User
                </Nav.Link>
              </LinkContainer>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

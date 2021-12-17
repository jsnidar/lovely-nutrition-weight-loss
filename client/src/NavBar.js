import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const NavBar = ({ setCurrentUser }) => {

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
      }
    });
  }

  return (
      <Navbar className='navigation' bg='light' expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="JacquelynKPhotography_LovelyNutritionLogo_BLACK.png"
              height="80rem"
              className="d-inline-block align-top"
              alt="Lovely Nutrition Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Button variant="outline-warning" onClick={handleLogoutClick}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavBar;
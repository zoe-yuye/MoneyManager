import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import logo from '../logo.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

function Header() {

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <Navbar variant='dark' expand="lg" className="bg-body-tertiary bg-header" >
      <Container>
        <LinkContainer to='/' >
          <Image src={logo} alt='logo' width={40} height={40} className='p-1 mx-2' />
        </LinkContainer>
        <LinkContainer to='/' >
          <Navbar.Brand>Money Manager</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={currentUser ? "/home" : "/"}  >
              <Nav.Link className='mx-3'>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to={currentUser ? "/analysis" : "/"} >
              <Nav.Link>Finacial Analysis</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {currentUser ? (<NavDropdown title={currentUser.email} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>) : (<>
              <LinkContainer to='/login' >
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/signup' >
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header;

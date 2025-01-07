import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#">Monitor</Navbar.Brand>
    </Container>
  </Navbar>
}

export default Header

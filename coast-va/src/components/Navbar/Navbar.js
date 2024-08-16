import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Logo from "../Logo/Logo"

function NavbarNav() {
    return (
        <Router>
            <Navbar bg="black" data-bs-theme="light" className='shadow-lg'>
                <Container>
                    <Navbar.Brand as={Link} to="/"><Logo id="navLogo" /></Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
          
        </Router>
    )
};

export default NavbarNav;
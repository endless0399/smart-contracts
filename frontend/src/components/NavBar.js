import React from "react";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";

export default class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand style={{color: "white"}} href="#home">Hello World Dapp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link style={{color: "white"}} href="#transactions">Transaction History</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="#tokenomics">Tokenomics (HWT)</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="#help">Help</Nav.Link>
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
        )
    }
}
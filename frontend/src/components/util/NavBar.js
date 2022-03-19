import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand style={{color: "white"}} href="/">Hello World Dapp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link style={{color: "white"}} href="/transactions">Transactions</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="#tokenomics">Tokenomics</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="#faucet">Faucet</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="/about">About</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }
}
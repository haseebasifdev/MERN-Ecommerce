import React from 'react'

import { Nav, Navbar, NavDropdown, Form, Button, FormControl, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sigout } from '../../actions';
function Header() {
    const auth=useSelector(state=>state.auth)
    const dispatch= useDispatch()
    const logout=()=>{
        // console.log('Came to Onclick function');
       dispatch(sigout())
    }
    const renderLoggedInLinks = () => {
        return (
            <Nav className=" ml-auto">
                <li className="nav-item">
                    <span  className="nav-link" onClick={logout}>Signout</span>

                </li>
            </Nav>
        )
    }
    const renderNonLoggedInLinks = () => {
        return (
            <Nav className=" ml-auto">
                <li className="nav-item">
                    <Link to="/signin" className="nav-link">Signin</Link>

                </li>
                <li className="nav-item">

                    <Link to="signup" className="nav-link">Signup</Link>

                </li>
            </Nav>
        )
    }
    return (<Navbar style={{ zIndex: 1 }} bg="light" varient="dark" collapseOnSelect expand="lg">

        <Container fluid>
            {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
            <Link className="navbar-brand" to='/'>Admin Dashboard</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#home">signin</Nav.Link> */}
                    {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
                </Nav>
                    {auth.authencate? renderLoggedInLinks() : renderNonLoggedInLinks()}
                {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form> */}
            </Navbar.Collapse>
        </Container>

    </Navbar>
    )
}

export default Header

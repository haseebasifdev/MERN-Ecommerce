import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Header from '../Header'
import './style.css'
function Layout(props) {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                        <Col className="sidebar" md={2}>
                            <ul>
                                <li><NavLink exact to={'/'}>Home</NavLink></li>
                                <li><NavLink to={'/orders'}>Orders</NavLink></li>
                                <li><NavLink to={'/products'}>Products</NavLink></li>
                                <li><NavLink to={'/Category'}>Category</NavLink></li>
                            </ul>
                        </Col>
                        <Col style={{ marginLeft: 'auto' }} md={10}>
                            {props.children}
                        </Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }

        </>
    )
}

export default Layout

import React,{useEffect, useState} from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { login ,isLoggedIn} from '../../actions'
import { useDispatch, useSelector  } from 'react-redux'

import { authConstants } from '../../actions/components'
import { Redirect } from 'react-router-dom'
const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
 
    const loginUser = (e) => {
        e.preventDefault();
        const user = { email, password }

        dispatch(login(user))

    }
    if (auth.authencate) {
        return <Redirect to={`/`} />
    }
    
    return (
        <Layout>
            <Container className="mt-4">
                <Row>
                    <Col md={{ span: 6, offset: 3, }}>
                        <Form onSubmit={loginUser} >

                            <Input
                                label="Email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button variant="primary" type="submit">
                                Login </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}

export default Signin

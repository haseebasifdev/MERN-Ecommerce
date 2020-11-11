import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { login, isLoggedIn } from '../../actions'
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions/user.action'
function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName, setLastName] = useState('')
    const [error, seterror] = useState('')
    const dispatch=useDispatch()
    const userSignUp=(e)=>{
        e.preventDefault()
        const user={
            firstName,
            lastName,
            email,
            password
        }
        dispatch(signup(user))
    }
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    
    if (auth.authencate) {
         
        return <Redirect to={`/`} />
    }
    if(user.loading)
    {
        return <p>Loading...</p>
    }
    return (
        <Layout>
            <Container className="mt-4">
                {user.message}
                <Row>
                    <Col md={{ span: 6, offset: 3, }}>
                        <Form onSubmit={userSignUp}>
                            <Row>
                                <Col md={{ span: 6 }}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />


                                </Col>
                                <Col md={{ span: 6 }}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) =>setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}
                            />


                            <Input
                                label="Password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button variant="primary" type="submit">
                                Register </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}

export default Signup

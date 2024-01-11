import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import { AiFillGithub } from "react-icons/ai";
import { LinkContainer } from 'react-router-bootstrap';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, currentUser, loginWithGithub } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        console.log(email, password);
        try {
            await login(email, password);
        } catch (error) {
            setError(error.message);
        } finally {
            setEmail('');
            setPassword('');
            setLoading(false);
        }

    };

    return (
        <>
            <h1 className='fs-4'>Log In</h1>
            {loading && <Loader />}
            {error && (
                <Alert variant='danger'>
                    {error}
                </Alert>)}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 max-w-400">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3 max-w-400">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
            <hr />
            <p>Do not have an account?</p>
            <Button variant="secondary" type="submit" onClick={loginWithGithub}>
            <AiFillGithub className='iconMargin'/>Login with Github
            </Button>
            <span className='mx-5'>Or </span>
            <LinkContainer to='/SignUp' >
                <Button variant='dark'>
                    Register an account
                </Button>
            </LinkContainer>
        </>
    )
}
export default LoginScreen;

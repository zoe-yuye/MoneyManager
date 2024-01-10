import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading]  = useState(false);
    const { signup, currentUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate])
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        if(password !== confirmPassword){
            setError('Passwords do not match');
            return;
        }
        try{
            await signup(email, password);
        }catch(error){
            setError(error.message);
        }finally{
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setLoading(false);
        }
        
    };

  
    return (
        <>
            <h1 className='fs-4'>Sign Up</h1>
            {loading && <Loader/>}
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
                <Form.Group className="mb-3 max-w-400">
                    <Form.Label>Comfirm Password</Form.Label>
                    <Form.Control value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" placeholder="Comfirm Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}
export default SignupScreen;

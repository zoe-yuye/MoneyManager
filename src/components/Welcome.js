import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../contexts/AuthContexts';

export default function Welcome() {
  const { currentUser } = useAuth();
  return (
    <Container className='text-center'>
      <h1 className='mx-5 my-4 color-welcome'>Welcome to Money Manager!</h1>
      {currentUser? (
          <>
            <LinkContainer to='/home'>
              <Button variant="warning" className='m-2'>Get Started</Button>
            </LinkContainer>
          </>
        ): (
          <>
            <LinkContainer to='/login'>
              <Button variant="warning">Login</Button>
            </LinkContainer>
          </>
        )}
      <div className='bg-img'>
        
      </div>
    </Container>
  );
}
